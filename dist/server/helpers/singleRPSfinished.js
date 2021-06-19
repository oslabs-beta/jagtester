"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const interfaces_1 = require("../interfaces");
const allRPSfinished_1 = __importDefault(require("./allRPSfinished"));
const sendRequestsAtRPS_1 = __importDefault(require("./sendRequestsAtRPS"));
const singleRPSfinished = (rpsGroup, io, globalTestConfig, globalVariables) => {
    io.emit(interfaces_1.ioSocketCommands.singleRPSfinished, rpsGroup);
    node_fetch_1.default(globalTestConfig.inputsData[0].targetURL, {
        headers: {
            jagtestercommand: interfaces_1.Jagtestercommands.endTest.toString(),
        },
    })
        .then((fetchRes) => fetchRes.json())
        .then((data) => {
        const curRPS = globalTestConfig.startRPS +
            globalVariables.currentInterval * globalTestConfig.rpsInterval;
        globalVariables.pulledDataFromTest[curRPS.toString()] = data;
        globalVariables.currentInterval++;
        sendRequestsAtRPS_1.default(globalVariables, globalTestConfig, io);
    })
        .catch(() => {
        allRPSfinished_1.default(globalTestConfig, io, globalVariables);
    });
};
exports.default = singleRPSfinished;
