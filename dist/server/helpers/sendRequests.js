"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("../interfaces");
const node_fetch_1 = __importDefault(require("node-fetch"));
const singleRPSfinished_1 = __importDefault(require("./singleRPSfinished"));
const allRPSfinished_1 = __importDefault(require("./allRPSfinished"));
const emitPercentage_1 = __importDefault(require("./emitPercentage"));
const sendRequests = (targetURL, rpsGroup, rpsActual, secondsToTest, globalVariables, io, globalTestConfig) => {
    const sendFetch = (reqId) => {
        node_fetch_1.default(targetURL, {
            agent: globalVariables.agent,
            signal: globalVariables.abortController.signal,
            headers: {
                jagtestercommand: interfaces_1.Jagtestercommands.running.toString(),
                jagtesterreqid: reqId.toString(),
            },
        })
            .then((res) => {
            const resRoute = new URL(targetURL).pathname;
            globalVariables.timeArrRoutes[resRoute][rpsGroup].successfulResCount++;
            globalVariables.successfulResCount++;
            emitPercentage_1.default(globalVariables, rpsGroup, secondsToTest, io);
            if (globalVariables.successfulResCount + globalVariables.errorCount >=
                rpsGroup * secondsToTest) {
                singleRPSfinished_1.default(rpsGroup, io, globalTestConfig, globalVariables);
            }
            if (res.headers.has('x-response-time')) {
                const xResponseTime = res.headers.get('x-response-time');
                globalVariables.timeArrRoutes[resRoute][rpsGroup].receivedTotalTime +=
                    xResponseTime ? +xResponseTime : 0;
            }
        })
            .catch((error) => {
            if (error.name === 'AbortError') {
                if (globalVariables.isTestRunning) {
                    globalVariables.isTestRunning = false;
                    // eventEmitter.emit(ioSocketCommands.allRPSfinished);
                    allRPSfinished_1.default(globalTestConfig, io, globalVariables);
                }
            }
            else {
                const resRoute = new URL(targetURL).pathname;
                globalVariables.timeArrRoutes[resRoute][rpsGroup].errorCount++;
                globalVariables.errorCount++;
                emitPercentage_1.default(globalVariables, rpsGroup, secondsToTest, io);
                if (globalVariables.successfulResCount + globalVariables.errorCount >=
                    rpsGroup * secondsToTest) {
                    singleRPSfinished_1.default(rpsGroup, io, globalTestConfig, globalVariables);
                }
            }
        });
    };
    // outer for loop to run for every second and set timeouts for after that second
    for (let j = 0; j < secondsToTest; j++) {
        for (let i = 0; i < rpsActual; i++) {
            const timeout = setTimeout(sendFetch.bind(this, i + j * rpsActual), Math.floor(Math.random() * 1000 + 1000 * j));
            globalVariables.timeOutArray.push(timeout);
        }
    }
    return;
};
exports.default = sendRequests;
