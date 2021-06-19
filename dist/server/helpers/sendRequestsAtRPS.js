"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("../interfaces");
const node_fetch_1 = __importDefault(require("node-fetch"));
const sendRequestsAtRPS = (rpsInterval, startRPS, endRPS, testLength, inputsData, globalVariables, allRPSfinished, globalTestConfig, io, trackedVariables, timeOutArray, timeArrRoutes, pulledDataFromTest, agent, sendRequests, singleRPSfinished, emitPercentage) => {
    // check if finished testing
    const curRPS = startRPS + globalVariables.currentInterval * rpsInterval;
    const call_allRPSfinished = () => {
        allRPSfinished(globalTestConfig, io, globalVariables, trackedVariables, timeOutArray, timeArrRoutes, pulledDataFromTest);
    };
    if (curRPS > endRPS) {
        // eventEmitter.emit(ioSocketCommands.allRPSfinished);
        call_allRPSfinished();
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
            globalVariables.errorCount = 0;
            globalVariables.successfulResCount = 0;
            sendRequests(target.targetURL, curRPS, Math.round((curRPS * target.percentage) / 100), testLength, agent, timeArrRoutes, trackedVariables, globalVariables, io, timeOutArray, singleRPSfinished, allRPSfinished, emitPercentage, globalTestConfig, pulledDataFromTest, sendRequestsAtRPS);
        })
            .catch(() => {
            call_allRPSfinished();
        });
    }
};
exports.default = sendRequestsAtRPS;
