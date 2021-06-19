"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const abort_controller_1 = __importDefault(require("abort-controller"));
const interfaces_1 = require("../interfaces");
const processData_1 = __importDefault(require("./processData"));
const processLastMiddleware_1 = __importDefault(require("./processLastMiddleware"));
const allRPSfinished = (globalTestConfig, io, globalVariables, trackedVariables, timeOutArray, timeArrRoutes, pulledDataFromTest) => {
    node_fetch_1.default(globalTestConfig.inputsData[0].targetURL, {
        headers: {
            jagtestercommand: interfaces_1.Jagtestercommands.endTest.toString(),
        },
    }).catch((err) => {
        io.emit(interfaces_1.ioSocketCommands.errorInfo, err.toString());
    });
    globalVariables.abortController = new abort_controller_1.default();
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
            pulledDataFromTest[rps][route] = processData_1.default(pulledDataFromTest[rps][route]);
            pulledDataFromTest[rps][route].receivedTime =
                timeArrRoutes[route][rps].receivedTotalTime;
            pulledDataFromTest[rps][route].errorCount = timeArrRoutes[route][rps].errorCount;
            pulledDataFromTest[rps][route].successfulResCount =
                timeArrRoutes[route][rps].successfulResCount;
            //fixing the elapsed time for the last middleware
            processLastMiddleware_1.default(pulledDataFromTest, rps, route);
        }
    }
    if (Object.keys(pulledDataFromTest).length > 0) {
        const newPulledData = {
            testTime: Date.now(),
            testData: pulledDataFromTest,
        };
        io.emit(interfaces_1.ioSocketCommands.allRPSfinished, [newPulledData]);
    }
};
exports.default = allRPSfinished;
