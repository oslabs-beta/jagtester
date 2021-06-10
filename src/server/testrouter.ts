import express from 'express';
import fetch from 'node-fetch';
import http from 'http';
import events from 'events';
import fs from 'fs';
import { io } from './index';
import {
    CollectedData,
    PulledDataFromTest,
    AllPulledDataFromTest,
    Jagtestercommands,
    TestConfigData,
} from './interfaces';

import { processData, processLastMiddleware } from './helperFunctions';

import AbortController from 'abort-controller';
let abortController = new AbortController();

const router = express.Router();
let timeArrRoutes: {
    // this key is used as the route name
    [key: string]: {
        //this key is used as the rps number
        [key: string]: {
            receivedTotalTime: number;
            errorCount: number;
            successfulResCount: number;
        };
    };
} = {};

const allPulledDataFromTest: AllPulledDataFromTest[] = [];
let pulledDataFromTest: PulledDataFromTest = {};
let globalTestConfig: TestConfigData;
const timeOutArray: NodeJS.Timeout[] = [];

const trackedVariables = {
    isTestRunningInternal: false,
    isTestRunningListener: (val: boolean) => {
        io.emit('testRunningStateChange', val); // TODO change io strings to enums
    },
    set isTestRunning(val: boolean) {
        this.isTestRunningInternal = val;
        this.isTestRunningListener(val);
    },
    get isTestRunning() {
        return this.isTestRunningInternal;
    },
};

let currentInterval = 0;
let errorCount = 0;
let successfulResCount = 0;

const eventEmitter = new events.EventEmitter();
eventEmitter.on('singleRPSfinished', (rpsGroup: number) => {
    io.emit('singleRPSfinished', rpsGroup);
    console.log(`test finished for rps group ${rpsGroup}`);
    // console.log(timeArrRoutes);
    const { rpsInterval, startRPS, endRPS, testLength, inputsData } = globalTestConfig;

    fetch(globalTestConfig.inputsData[0].targetURL, {
        headers: {
            jagtestercommand: Jagtestercommands.endTest.toString(),
        },
    })
        .then((fetchRes) => fetchRes.json())
        .then((data) => {
            const curRPS = startRPS + currentInterval * rpsInterval;
            pulledDataFromTest[curRPS.toString()] = data;
            currentInterval++;
            sendRequestsAtRPS(rpsInterval, startRPS, endRPS, testLength, inputsData);
        })
        .catch(() => {
            eventEmitter.emit('allRPSfinished');
        }); // TODO add better error handling
});

eventEmitter.on('allRPSfinished', () => {
    console.log('all rps finished');
    fetch(globalTestConfig.inputsData[0].targetURL, {
        headers: {
            jagtestercommand: Jagtestercommands.endTest.toString(),
        },
    }).catch((err) => {
        io.emit('errorInfo', err.toString());
    });
    abortController = new AbortController();
    trackedVariables.isTestRunning = false;

    // clear timeouts
    for (const timeout of timeOutArray) {
        clearTimeout(timeout);
    }
    timeOutArray.splice(0, timeOutArray.length);

    // getting the average response time, since we had the total response times added together
    for (const route in timeArrRoutes) {
        for (const rpsGroup in timeArrRoutes[route]) {
            timeArrRoutes[route][rpsGroup].receivedTotalTime =
                Math.round(
                    (1000 * timeArrRoutes[route][rpsGroup].receivedTotalTime) /
                        timeArrRoutes[route][rpsGroup].successfulResCount
                ) / 1000;
        }
    }
    // console.log('timeArrRoutes', timeArrRoutes);

    // processing middlewares, averaging them, then combining timearrroutes
    for (const rps in pulledDataFromTest) {
        for (const route in pulledDataFromTest[rps]) {
            pulledDataFromTest[rps][route] = processData(
                pulledDataFromTest[rps][route] as CollectedData
            );
            pulledDataFromTest[rps][route].receivedTime =
                timeArrRoutes[route][rps].receivedTotalTime;
            pulledDataFromTest[rps][route].errorCount = timeArrRoutes[route][rps].errorCount;
            pulledDataFromTest[rps][route].successfulResCount =
                timeArrRoutes[route][rps].successfulResCount;

            //fixing the elapsed time for the last middleware
            processLastMiddleware(pulledDataFromTest, rps, route);
        }
    }

    if (Object.keys(pulledDataFromTest).length > 0) {
        allPulledDataFromTest.push({
            testTime: Date.now(),
            testData: pulledDataFromTest,
        });
        io.emit('allRPSfinished', allPulledDataFromTest);
    }
});

const agent = new http.Agent({ keepAlive: true });
// const targetURL = 'http://localhost:3030/testroute';

const sendRequests = (
    targetURL: string,
    rpsGroup: number,
    rpsActual: number,
    secondsToTest: number
) => {
    const sendFetch = (reqId: number) => {
        fetch(targetURL, {
            agent,
            signal: abortController.signal,
            headers: {
                jagtestercommand: Jagtestercommands.running.toString(),
                jagtesterreqid: reqId.toString(),
            },
        })
            .then((res) => {
                const resRoute = new URL(targetURL).pathname;
                timeArrRoutes[resRoute][rpsGroup].successfulResCount++;
                successfulResCount++;
                if (successfulResCount + errorCount >= rpsGroup * secondsToTest) {
                    eventEmitter.emit('singleRPSfinished', rpsGroup);
                }
                if (res.headers.has('x-response-time')) {
                    const xResponseTime = res.headers.get('x-response-time');
                    timeArrRoutes[resRoute][rpsGroup].receivedTotalTime += xResponseTime
                        ? +xResponseTime
                        : 0;
                }
            })
            .catch((error) => {
                if (error.name === 'AbortError') {
                    if (trackedVariables.isTestRunning) {
                        trackedVariables.isTestRunning = false;
                        eventEmitter.emit('allRPSfinished');
                    }
                } else {
                    const resRoute = new URL(targetURL).pathname;
                    timeArrRoutes[resRoute][rpsGroup].errorCount++;
                    errorCount++;
                    if (successfulResCount + errorCount >= rpsGroup * secondsToTest) {
                        eventEmitter.emit('singleRPSfinished', rpsGroup);
                    }
                }
            });
    };

    // outer for loop to run for every second and set timeouts for after that second
    for (let j = 0; j < secondsToTest; j++) {
        for (let i = 0; i < rpsActual; i++) {
            const timeout = setTimeout(
                sendFetch.bind(this, i + j * rpsActual),
                Math.floor(Math.random() * 1000 + 1000 * j)
            );
            timeOutArray.push(timeout);
        }
    }
};

const sendRequestsAtRPS = (
    rpsInterval: number,
    startRPS: number,
    endRPS: number,
    testLength: number,
    inputsData: {
        method: string;
        targetURL: string;
        percentage: number;
    }[]
) => {
    // check if finished testing
    const curRPS = startRPS + currentInterval * rpsInterval;
    if (curRPS > endRPS) {
        eventEmitter.emit('allRPSfinished');
        return;
    }

    // update layer first then start testing
    for (const target of inputsData) {
        fetch(target.targetURL, {
            agent,
            headers: {
                jagtestercommand: Jagtestercommands.updateLayer.toString(),
            },
        })
            .then(() => {
                // saving the resroute into the collection object
                const resRoute = new URL(target.targetURL).pathname;
                if (timeArrRoutes[resRoute] === undefined) {
                    timeArrRoutes[resRoute] = {};
                    timeArrRoutes[resRoute][curRPS.toString()] = {
                        receivedTotalTime: 0,
                        errorCount: 0,
                        successfulResCount: 0,
                    };
                } else {
                    if (timeArrRoutes[resRoute][curRPS.toString()] === undefined) {
                        timeArrRoutes[resRoute][curRPS.toString()] = {
                            receivedTotalTime: 0,
                            errorCount: 0,
                            successfulResCount: 0,
                        };
                    }
                }
                errorCount = 0;
                successfulResCount = 0;
                sendRequests(
                    target.targetURL,
                    curRPS,
                    Math.round((curRPS * target.percentage) / 100),
                    testLength
                );
                // res.json({ jagtester: true });
            })
            .catch(() => {
                eventEmitter.emit('allRPSfinished');
            }); //TODO better error handling
    }
};

router.post('/startmultiple', (req, res) => {
    if (!trackedVariables.isTestRunning) {
        trackedVariables.isTestRunning = true;
        timeArrRoutes = {};
        pulledDataFromTest = {};
        currentInterval = 0;
        globalTestConfig = {
            rpsInterval: req.body.rpsInterval,
            startRPS: req.body.startRPS,
            endRPS: req.body.endRPS,
            testLength: req.body.testLength,
            inputsData: req.body.inputsData,
        };

        const { rpsInterval, startRPS, endRPS, testLength, inputsData } = req.body;
        sendRequestsAtRPS(rpsInterval, startRPS, endRPS, testLength, inputsData);
    }
    res.sendStatus(200); //TODO add functionality to the front end to test is jagtest:true is received from the targets
});
router.post('/checkjagtester', (req, res) => {
    fetch(req.body.inputURL, {
        method: req.body.method,
        agent,
        headers: {
            jagtestercommand: Jagtestercommands.updateLayer.toString(),
        },
    })
        .then((fetchRes) => fetchRes.json())
        .then((data) => res.json(data))
        .catch(() => res.json({ jagtester: false }));
});

router.get('/getlogs', (req, res) => {
    res.json(pulledDataFromTest);
});

router.get('/saveddata', (req, res) => {
    res.json(allPulledDataFromTest);
});
router.get('/stopTest', (req, res) => {
    abortController.abort();
    res.sendStatus(200);
});
router.get('/data-with-timestamp', (req, res) => {
    const data = fs.readFileSync(__dirname + '/../../src/server/datatimestamps.json', {
        encoding: 'utf-8',
    });
    res.json(JSON.parse(data));
});

export default router;
