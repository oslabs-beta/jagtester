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
const allRPSfinished = (globalTestConfig, io, globalVariables) => {
    node_fetch_1.default(globalTestConfig.inputsData[0].targetURL, {
        headers: {
            jagtestercommand: interfaces_1.Jagtestercommands.endTest.toString(),
        },
    }).catch((err) => {
        io.emit(interfaces_1.ioSocketCommands.errorInfo, err.toString());
    });
    globalVariables.abortController = new abort_controller_1.default();
    globalVariables.isTestRunning = false;
    // clear timeouts
    for (const timeout of globalVariables.timeOutArray) {
        clearTimeout(timeout);
    }
    globalVariables.timeOutArray.splice(0, globalVariables.timeOutArray.length);
    // getting the average response time, since we had the total response times added together
    for (const route in globalVariables.timeArrRoutes) {
        for (const rpsGroup in globalVariables.timeArrRoutes[route]) {
            globalVariables.timeArrRoutes[route][rpsGroup].receivedTotalTime =
                Math.round((1000 * globalVariables.timeArrRoutes[route][rpsGroup].receivedTotalTime) /
                    globalVariables.timeArrRoutes[route][rpsGroup].successfulResCount) / 1000;
        }
    }
    // processing middlewares, averaging them, then combining timearrroutes
    for (const rps in globalVariables.pulledDataFromTest) {
        for (const route in globalVariables.pulledDataFromTest[rps]) {
            globalVariables.pulledDataFromTest[rps][route] = processData_1.default(globalVariables.pulledDataFromTest[rps][route]);
            globalVariables.pulledDataFromTest[rps][route].receivedTime =
                globalVariables.timeArrRoutes[route][rps].receivedTotalTime;
            globalVariables.pulledDataFromTest[rps][route].errorCount =
                globalVariables.timeArrRoutes[route][rps].errorCount;
            globalVariables.pulledDataFromTest[rps][route].successfulResCount =
                globalVariables.timeArrRoutes[route][rps].successfulResCount;
            //fixing the elapsed time for the last middleware
            processLastMiddleware_1.default(globalVariables.pulledDataFromTest, rps, route);
        }
    }
    if (Object.keys(globalVariables.pulledDataFromTest).length > 0) {
        const newPulledData = {
            testTime: Date.now(),
            testData: globalVariables.pulledDataFromTest,
        };
        io.emit(interfaces_1.ioSocketCommands.allRPSfinished, [newPulledData]);
    }
};
exports.default = allRPSfinished;
