"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("../interfaces");
const node_fetch_1 = __importDefault(require("node-fetch"));
const sendRequests = (targetURL, rpsGroup, rpsActual, secondsToTest, agent, timeArrRoutes, trackedVariables, globalVariables, io, timeOutArray, singleRPSfinished, allRPSfinished, emitPercentage, globalTestConfig, pulledDataFromTest, allPulledDataFromTest, sendRequestsAtRPS) => {
    const sendFetch = (reqId) => {
        node_fetch_1.default(targetURL, {
            agent,
            signal: globalVariables.abortController.signal,
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
                singleRPSfinished(rpsGroup, io, globalTestConfig, globalVariables, pulledDataFromTest, allRPSfinished, sendRequestsAtRPS, trackedVariables, timeOutArray, timeArrRoutes, allPulledDataFromTest, agent, sendRequests, emitPercentage);
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
                    allRPSfinished(globalTestConfig, io, globalVariables, trackedVariables, timeOutArray, timeArrRoutes, pulledDataFromTest, allPulledDataFromTest);
                }
            }
            else {
                const resRoute = new URL(targetURL).pathname;
                timeArrRoutes[resRoute][rpsGroup].errorCount++;
                globalVariables.errorCount++;
                emitPercentage(globalVariables.successfulResCount, globalVariables.errorCount, rpsGroup, secondsToTest, io);
                if (globalVariables.successfulResCount + globalVariables.errorCount >=
                    rpsGroup * secondsToTest) {
                    singleRPSfinished(rpsGroup, io, globalTestConfig, globalVariables, pulledDataFromTest, allRPSfinished, sendRequestsAtRPS, trackedVariables, timeOutArray, timeArrRoutes, allPulledDataFromTest, agent, sendRequests, emitPercentage);
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
exports.default = sendRequests;
