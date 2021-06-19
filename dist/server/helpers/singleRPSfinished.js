"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const interfaces_1 = require("../interfaces");
const singleRPSfinished = (rpsGroup, io, globalTestConfig, globalVariables, pulledDataFromTest, allRPSfinished, sendRequestsAtRPS, trackedVariables, timeOutArray, timeArrRoutes, agent, sendRequests, emitPercentage) => {
    io.emit(interfaces_1.ioSocketCommands.singleRPSfinished, rpsGroup);
    const { rpsInterval, startRPS, endRPS, testLength, inputsData } = globalTestConfig;
    node_fetch_1.default(globalTestConfig.inputsData[0].targetURL, {
        headers: {
            jagtestercommand: interfaces_1.Jagtestercommands.endTest.toString(),
        },
    })
        .then((fetchRes) => fetchRes.json())
        .then((data) => {
        const curRPS = startRPS + globalVariables.currentInterval * rpsInterval;
        pulledDataFromTest[curRPS.toString()] = data;
        globalVariables.currentInterval++;
        sendRequestsAtRPS(rpsInterval, startRPS, endRPS, testLength, inputsData, globalVariables, allRPSfinished, globalTestConfig, io, trackedVariables, timeOutArray, timeArrRoutes, pulledDataFromTest, agent, sendRequests, singleRPSfinished, emitPercentage);
    })
        .catch(() => {
        // eventEmitter.emit(ioSocketCommands.allRPSfinished);
        allRPSfinished(globalTestConfig, io, globalVariables, trackedVariables, timeOutArray, timeArrRoutes, pulledDataFromTest);
    });
};
exports.default = singleRPSfinished;
