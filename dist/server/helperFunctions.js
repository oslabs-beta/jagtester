"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRequests = exports.emitPercentage = exports.processLastMiddleware = exports.processData = void 0;
const interfaces_1 = require("./interfaces");
const node_fetch_1 = __importDefault(require("node-fetch"));
const processData = (data) => {
    const collectedDataArr = [];
    for (const key in data) {
        collectedDataArr.push(data[key]);
    }
    // add middlewares elapsed times
    const collectedDataSingle = collectedDataArr.reduce((acc, cur) => {
        for (let i = 0; i < acc.middlewares.length; i++) {
            if (i < cur.middlewares.length) {
                acc.middlewares[i].elapsedTime += cur.middlewares[i].elapsedTime;
            }
        }
        return acc;
    });
    // divide by the count of requests
    collectedDataSingle.middlewares.forEach((middleware) => {
        middleware.elapsedTime =
            Math.round((100 * middleware.elapsedTime) / collectedDataArr.length) / 100;
    });
    return collectedDataSingle;
};
exports.processData = processData;
const processLastMiddleware = (pulledDataFromTest, rps, route) => {
    const indexOfLast = pulledDataFromTest[rps][route].middlewares.length - 1;
    const tempMiddleware = {
        fnName: 'temp',
        elapsedTime: 0,
    };
    pulledDataFromTest[rps][route].middlewares[indexOfLast].elapsedTime =
        Math.round(100 *
            (pulledDataFromTest[rps][route].receivedTime -
                pulledDataFromTest[rps][route].middlewares.reduce((acc, cur) => {
                    acc.elapsedTime += cur.elapsedTime;
                    return acc;
                }, tempMiddleware).elapsedTime)) / 100;
};
exports.processLastMiddleware = processLastMiddleware;
const emitPercentage = (successfulResCount, errorCount, rpsGroup, secondsToTest, io) => {
    const percent = (successfulResCount + errorCount) / (rpsGroup * secondsToTest);
    if (Math.floor(10000 * percent) % 1000 === 0) {
        io.emit(interfaces_1.ioSocketCommands.currentRPSProgress, percent);
    }
};
exports.emitPercentage = emitPercentage;
const sendRequests = (targetURL, rpsGroup, rpsActual, secondsToTest, agent, abortController, timeArrRoutes, trackedVariables, globalVariables, io, timeOutArray, singleRPSfinished, allRPSfinished, emitPercentage) => {
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
            globalVariables.successfulResCount++;
            emitPercentage(globalVariables.successfulResCount, globalVariables.errorCount, rpsGroup, secondsToTest, io);
            if (globalVariables.successfulResCount + globalVariables.errorCount >=
                rpsGroup * secondsToTest) {
                // eventEmitter.emit(ioSocketCommands.singleRPSfinished, rpsGroup);
                singleRPSfinished(rpsGroup);
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
                    // eventEmitter.emit(ioSocketCommands.allRPSfinished);
                    allRPSfinished();
                }
            }
            else {
                const resRoute = new URL(targetURL).pathname;
                timeArrRoutes[resRoute][rpsGroup].errorCount++;
                globalVariables.errorCount++;
                emitPercentage(globalVariables.successfulResCount, globalVariables.errorCount, rpsGroup, secondsToTest, io);
                if (globalVariables.successfulResCount + globalVariables.errorCount >=
                    rpsGroup * secondsToTest) {
                    // eventEmitter.emit(ioSocketCommands.singleRPSfinished, rpsGroup);
                    singleRPSfinished(rpsGroup);
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
    return;
};
exports.sendRequests = sendRequests;
