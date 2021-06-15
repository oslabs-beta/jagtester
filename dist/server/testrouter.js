"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const http_1 = __importDefault(require("http"));
const events_1 = __importDefault(require("events"));
const index_1 = require("./index");
const interfaces_1 = require("./interfaces");
const helperFunctions_1 = require("./helperFunctions");
const abort_controller_1 = __importDefault(require("abort-controller"));
let abortController = new abort_controller_1.default();
const router = express_1.default.Router();
let timeArrRoutes = {};
const allPulledDataFromTest = [];
let pulledDataFromTest = {};
let globalTestConfig;
const timeOutArray = [];
const trackedVariables = {
    isTestRunningInternal: false,
    isTestRunningListener: (val) => {
        index_1.io.emit(interfaces_1.ioSocketCommands.testRunningStateChange, val);
    },
    set isTestRunning(val) {
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
const eventEmitter = new events_1.default.EventEmitter();
eventEmitter.on(interfaces_1.ioSocketCommands.singleRPSfinished, (rpsGroup) => {
    index_1.io.emit(interfaces_1.ioSocketCommands.singleRPSfinished, rpsGroup);
    const { rpsInterval, startRPS, endRPS, testLength, inputsData } = globalTestConfig;
    node_fetch_1.default(globalTestConfig.inputsData[0].targetURL, {
        headers: {
            jagtestercommand: interfaces_1.Jagtestercommands.endTest.toString(),
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
        eventEmitter.emit(interfaces_1.ioSocketCommands.allRPSfinished);
    });
});
eventEmitter.on(interfaces_1.ioSocketCommands.allRPSfinished, () => {
    node_fetch_1.default(globalTestConfig.inputsData[0].targetURL, {
        headers: {
            jagtestercommand: interfaces_1.Jagtestercommands.endTest.toString(),
        },
    }).catch((err) => {
        index_1.io.emit(interfaces_1.ioSocketCommands.errorInfo, err.toString());
    });
    abortController = new abort_controller_1.default();
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
                Math.round((1000 * timeArrRoutes[route][rpsGroup].receivedTotalTime) /
                    timeArrRoutes[route][rpsGroup].successfulResCount) / 1000;
        }
    }
    // processing middlewares, averaging them, then combining timearrroutes
    for (const rps in pulledDataFromTest) {
        for (const route in pulledDataFromTest[rps]) {
            pulledDataFromTest[rps][route] = helperFunctions_1.processData(pulledDataFromTest[rps][route]);
            pulledDataFromTest[rps][route].receivedTime =
                timeArrRoutes[route][rps].receivedTotalTime;
            pulledDataFromTest[rps][route].errorCount = timeArrRoutes[route][rps].errorCount;
            pulledDataFromTest[rps][route].successfulResCount =
                timeArrRoutes[route][rps].successfulResCount;
            //fixing the elapsed time for the last middleware
            helperFunctions_1.processLastMiddleware(pulledDataFromTest, rps, route);
        }
    }
    if (Object.keys(pulledDataFromTest).length > 0) {
        const newPulledData = {
            testTime: Date.now(),
            testData: pulledDataFromTest,
        };
        allPulledDataFromTest.push(newPulledData);
        index_1.io.emit(interfaces_1.ioSocketCommands.allRPSfinished, [newPulledData]);
    }
});
const agent = new http_1.default.Agent({ keepAlive: true });
// const targetURL = 'http://localhost:3030/testroute';
const sendRequests = (targetURL, rpsGroup, rpsActual, secondsToTest) => {
    const sendFetch = (reqId) => {
        node_fetch_1.default(targetURL, {
            agent,
            signal: abortController.signal,
            headers: {
                jagtestercommand: interfaces_1.Jagtestercommands.running.toString(),
                jagtesterreqid: reqId.toString(),
            },
        })
            .then((res) => {
            const resRoute = new URL(targetURL).pathname;
            timeArrRoutes[resRoute][rpsGroup].successfulResCount++;
            successfulResCount++;
            helperFunctions_1.emitPercentage(successfulResCount, errorCount, rpsGroup, secondsToTest);
            if (successfulResCount + errorCount >= rpsGroup * secondsToTest) {
                eventEmitter.emit(interfaces_1.ioSocketCommands.singleRPSfinished, rpsGroup);
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
                    eventEmitter.emit(interfaces_1.ioSocketCommands.allRPSfinished);
                }
            }
            else {
                const resRoute = new URL(targetURL).pathname;
                timeArrRoutes[resRoute][rpsGroup].errorCount++;
                errorCount++;
                helperFunctions_1.emitPercentage(successfulResCount, errorCount, rpsGroup, secondsToTest);
                if (successfulResCount + errorCount >= rpsGroup * secondsToTest) {
                    eventEmitter.emit(interfaces_1.ioSocketCommands.singleRPSfinished, rpsGroup);
                }
            }
        });
    };
    // outer for loop to run for every second and set timeouts for after that second
    for (let j = 0; j < secondsToTest; j++) {
        for (let i = 0; i < rpsActual; i++) {
            const timeout = setTimeout(sendFetch.bind(this, i + j * rpsActual), Math.floor(Math.random() * 1000 + 1000 * j));
            timeOutArray.push(timeout);
        }
    }
};
const sendRequestsAtRPS = (rpsInterval, startRPS, endRPS, testLength, inputsData) => {
    // check if finished testing
    const curRPS = startRPS + currentInterval * rpsInterval;
    if (curRPS > endRPS) {
        eventEmitter.emit(interfaces_1.ioSocketCommands.allRPSfinished);
        return;
    }
    // update layer first then start testing
    for (const target of inputsData) {
        node_fetch_1.default(target.targetURL, {
            agent,
            headers: {
                jagtestercommand: interfaces_1.Jagtestercommands.updateLayer.toString(),
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
            }
            else {
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
            sendRequests(target.targetURL, curRPS, Math.round((curRPS * target.percentage) / 100), testLength);
            // res.json({ jagtester: true });
        })
            .catch(() => {
            eventEmitter.emit(interfaces_1.ioSocketCommands.allRPSfinished);
        });
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
    res.sendStatus(200);
});
router.post('/checkjagtester', (req, res) => {
    node_fetch_1.default(req.body.inputURL, {
        method: req.body.method,
        agent,
        headers: {
            jagtestercommand: interfaces_1.Jagtestercommands.updateLayer.toString(),
        },
    })
        .then((fetchRes) => fetchRes.json())
        .then((data) => res.json(data))
        .catch(() => res.json({ jagtester: false }));
});
router.get('/stopTest', (req, res) => {
    abortController.abort();
    res.sendStatus(200);
});
router.delete('/saveddata', (req, res) => {
    allPulledDataFromTest.splice(0, allPulledDataFromTest.length);
    res.sendStatus(200);
});
router.delete('/singledata/:index', (req, res) => {
    if (req.params.index && Number(req.params.index) < allPulledDataFromTest.length) {
        allPulledDataFromTest.splice(Number(req.params.index), 1);
    }
    res.sendStatus(200);
});
exports.default = router;
