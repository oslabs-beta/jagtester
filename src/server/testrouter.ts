import express from 'express';
import fetch from 'node-fetch';
import http from 'http';
import events from 'events';

import { TimeArrInterface, CollectedData, CollctedDataSingle, Jagtestercommands, TestConfigData } from './interfaces';

const router = express.Router();
const testRequestRPS = 5;
const testRequestSeconds = 1;
const timeArr: TimeArrInterface[] = [];
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
let globalTestConfig: TestConfigData;
let isTestRunning = false;
let currentInterval = 0;
let errorCount = 0;
let successfulResCount = 0;

const eventEmitter = new events.EventEmitter();
eventEmitter.on('singleRPSfinished', (rpsGroup: number) => {
    console.log(`test finished for rps group ${rpsGroup}`);
    // console.log(timeArrRoutes);
    currentInterval++;
    const { rpsInterval, startRPS, endRPS, testLength, inputsData } = globalTestConfig;
    sendRequestsAtRPS(rpsInterval, startRPS, endRPS, testLength, inputsData);
});

eventEmitter.on('allRPSfinished', () => {
    console.log('all rps finished');
    isTestRunning = false;
    // getting the average response time, since we had the total response times added together

    for (const route in timeArrRoutes) {
        for (const rpsGroup in timeArrRoutes[route]) {
            timeArrRoutes[route][rpsGroup].receivedTotalTime =
                Math.round(
                    (1000 * timeArrRoutes[route][rpsGroup].receivedTotalTime) /
                        (timeArrRoutes[route][rpsGroup].errorCount + timeArrRoutes[route][rpsGroup].successfulResCount)
                ) / 1000;
        }
    }
    console.log(timeArrRoutes);
});

const agent = new http.Agent({ keepAlive: true });
const targetURL = 'http://localhost:3030/testroute';

const sendRequests = (targetURL: string, rpsGroup: number, rpsActual: number, secondsToTest: number) => {
    const sendFetch = (reqId: number) => {
        fetch(targetURL, {
            agent,
            headers: {
                jagtestercommand: Jagtestercommands.running.toString(),
                jagtesterreqid: reqId.toString(),
            },
        })
            .then((res) => {
                timeArrRoutes[targetURL][rpsGroup].successfulResCount++;
                successfulResCount++;
                if (successfulResCount + errorCount >= rpsGroup * secondsToTest) {
                    eventEmitter.emit('singleRPSfinished', rpsGroup);
                }
                if (res.headers.has('x-response-time')) {
                    const xResponseTime = res.headers.get('x-response-time');
                    timeArrRoutes[targetURL][rpsGroup].receivedTotalTime += xResponseTime ? +xResponseTime : 0;
                }
                // timeArr.push({
                //     receivedTotalTime,
                //     recordedTotalTime: Date.now() - timeBefore,
                // });
            })
            .catch(() => {
                timeArrRoutes[targetURL][rpsGroup].errorCount++;
                errorCount++;
                if (successfulResCount + errorCount >= rpsGroup * secondsToTest) {
                    eventEmitter.emit('singleRPSfinished', rpsGroup);
                }
            });
    };

    // outer for loop to run for every second and set timeouts for after that second
    for (let j = 0; j < secondsToTest; j++) {
        for (let i = 0; i < rpsActual; i++) {
            setTimeout(sendFetch.bind(this, i + j * rpsActual), Math.floor(Math.random() * 1000 + 1000 * j));
        }
    }
};

// router.post('/start', (req, res) => {
//     console.log(req.body);
//     fetch(targetURL, {
//         agent,
//         headers: {
//             jagtestercommand: Jagtestercommands.updateLayer.toString(),
//         },
//     })
//         .then((res) => res.json())
//         .then((data) => {
//             // if the server is jagtester enabled
//             if (data.jagtester) {
//                 // reset collected data before starting the testing
//                 timeArr.splice(0, timeArr.length);
//                 errorCount = 0;
//                 successfulResCount = 0;
//                 sendRequests(testRequestRPS, testRequestSeconds);
//                 res.json({ jagtester: true });
//             }
//             // if not enabled
//             else {
//                 res.json({ jagtester: false });
//             }
//         })
//         .catch((err) => res.send(err)); //TODO better error handling
// });

router.post('/checkjagtester', (req, res) => {
    fetch(req.body.testTarget, {
        method: req.body.method,
        agent,
        headers: {
            jagtestercommand: Jagtestercommands.updateLayer.toString(),
        },
    })
        .then((res) => res.json())
        .then((data) => res.json(data))
        .catch(() => res.json({ jagtester: false }));
});

const sendRequestsAtRPS = (
    rpsInterval: number,
    startRPS: number,
    endRPS: number,
    testLength: number,
    inputsData: {
        method: string;
        targetURL: string;
        percentage: number[];
    }[]
) => {
    const curRPS = startRPS + currentInterval * rpsInterval;
    if (curRPS > endRPS) {
        eventEmitter.emit('allRPSfinished');
        return;
    }
    for (const target of inputsData) {
        fetch(target.targetURL, {
            agent,
            headers: {
                jagtestercommand: Jagtestercommands.updateLayer.toString(),
            },
        })
            .then(() => {
                if (timeArrRoutes[target.targetURL] === undefined) {
                    timeArrRoutes[target.targetURL] = {};
                    timeArrRoutes[target.targetURL][curRPS.toString()] = {
                        receivedTotalTime: 0,
                        errorCount: 0,
                        successfulResCount: 0,
                    };
                } else {
                    if (timeArrRoutes[target.targetURL][curRPS.toString()] === undefined) {
                        timeArrRoutes[target.targetURL][curRPS.toString()] = {
                            receivedTotalTime: 0,
                            errorCount: 0,
                            successfulResCount: 0,
                        };
                    }
                }
                errorCount = 0;
                successfulResCount = 0;
                sendRequests(target.targetURL, curRPS, Math.round((curRPS * target.percentage[0]) / 100), testLength);
                // res.json({ jagtester: true });
            })
            .catch((err) => console.log(err)); //TODO better error handling
    }
};

router.post('/startmultiple', (req, res) => {
    if (!isTestRunning) {
        isTestRunning = true;
        timeArrRoutes = {};
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

router.get('/getlogs', (req, res) => {
    fetch(targetURL, {
        headers: {
            jagtestercommand: Jagtestercommands.endTest.toString(),
        },
    })
        .then((fetchRes) => fetchRes.json())
        .then((data) => {
            return res.json(processData(data));
        })
        .catch((err) => res.send(err)); // TODO add better error handling
});
router.get('/getlogsjson', (req, res) => {
    fetch(targetURL, {
        headers: {
            jagtestercommand: Jagtestercommands.endTest.toString(),
        },
    })
        .then((fetchRes) => fetchRes.json())
        .then((data) => {
            return res.json(data);
        })
        .catch((err) => res.send(err)); // TODO add better error handling
});

const processData: (data: CollectedData) => CollctedDataSingle = (data: CollectedData) => {
    const collectedDataArr: CollctedDataSingle[] = [];
    for (const key in data) {
        collectedDataArr.push(data[key]);
    }

    // add middlewares elapsed times
    const collectedDataSingle: CollctedDataSingle = collectedDataArr.reduce((acc, cur) => {
        for (let i = 0; i < acc.middlewares.length; i++) {
            if (i < cur.middlewares.length) {
                acc.middlewares[i].elapsedTime += cur.middlewares[i].elapsedTime;
            }
        }
        return acc;
    });

    // divide by the count of requests
    collectedDataSingle.middlewares.forEach((middleware) => {
        middleware.elapsedTime = Math.round((100 * middleware.elapsedTime) / collectedDataArr.length) / 100;
    });

    let averagedTimeArr: TimeArrInterface = {
        receivedTotalTime: 0,
        recordedTotalTime: 0,
    };
    if (timeArr.length > 0) {
        averagedTimeArr = timeArr.reduce((acc, cur) => {
            const newAcc: TimeArrInterface = {
                receivedTotalTime: 0,
                recordedTotalTime: 0,
            };
            newAcc.receivedTotalTime = acc.receivedTotalTime + cur.receivedTotalTime;
            newAcc.recordedTotalTime = acc.recordedTotalTime + cur.recordedTotalTime;
            return newAcc;
        });
    }
    collectedDataSingle.recordedTime =
        Math.round((100 * averagedTimeArr.recordedTotalTime) / (testRequestRPS * testRequestSeconds - errorCount)) /
        100;
    collectedDataSingle.receivedTime =
        Math.round((100 * averagedTimeArr.receivedTotalTime) / (testRequestRPS * testRequestSeconds - errorCount)) /
        100;
    collectedDataSingle.errorCount = errorCount;
    collectedDataSingle.successfulResCount = successfulResCount;
    collectedDataSingle.requestCount = testRequestRPS * testRequestSeconds;
    collectedDataSingle.RPS = testRequestRPS;

    // setting the last middleware's elapsed time to the total minus the rest
    let sumOfMiddlewareTimes = 0;
    for (const time of collectedDataSingle.middlewares) sumOfMiddlewareTimes += time.elapsedTime;
    collectedDataSingle.middlewares[collectedDataSingle.middlewares.length - 1].elapsedTime =
        Math.round(100 * (collectedDataSingle.receivedTime - sumOfMiddlewareTimes)) / 100;
    return collectedDataSingle;
};

export default router;
