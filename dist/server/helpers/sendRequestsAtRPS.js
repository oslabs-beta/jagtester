"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("../interfaces");
const node_fetch_1 = __importDefault(require("node-fetch"));
const allRPSfinished_1 = __importDefault(require("./allRPSfinished"));
const sendRequests_1 = __importDefault(require("./sendRequests"));
const sendRequestsAtRPS = (globalVariables, globalTestConfig, io) => {
    // check if finished testing
    const curRPS = globalTestConfig.startRPS + globalVariables.currentInterval * globalTestConfig.rpsInterval;
    if (curRPS > globalTestConfig.endRPS) {
        allRPSfinished_1.default(globalTestConfig, io, globalVariables);
        return;
    }
    // update layer first then start testing
    for (const target of globalTestConfig.inputsData) {
        node_fetch_1.default(target.targetURL, {
            agent: globalVariables.agent,
            headers: {
                jagtestercommand: interfaces_1.Jagtestercommands.updateLayer.toString(),
            },
        })
            .then(() => {
            // saving the resroute into the collection object
            const resRoute = new URL(target.targetURL).pathname;
            if (globalVariables.timeArrRoutes[resRoute] === undefined) {
                globalVariables.timeArrRoutes[resRoute] = {};
            }
            if (globalVariables.timeArrRoutes[resRoute][curRPS.toString()] === undefined) {
                globalVariables.timeArrRoutes[resRoute][curRPS.toString()] = {
                    receivedTotalTime: 0,
                    errorCount: 0,
                    successfulResCount: 0,
                };
            }
            globalVariables.errorCount = 0;
            globalVariables.successfulResCount = 0;
            sendRequests_1.default(target.targetURL, curRPS, Math.round((curRPS * target.percentage) / 100), globalTestConfig.testLength, globalVariables, io, globalTestConfig);
        })
            .catch(() => {
            allRPSfinished_1.default(globalTestConfig, io, globalVariables);
        });
    }
};
exports.default = sendRequestsAtRPS;
