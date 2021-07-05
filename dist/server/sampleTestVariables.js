"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeVariables = exports.io = exports.globalVariables = exports.abortController = exports.timeOutArray = exports.globalTestConfig = void 0;
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const abort_controller_1 = __importDefault(require("abort-controller"));
const interfaces_1 = require("./interfaces");
let timeOutArray, abortController, globalTestConfig, timeArrRoutes, pulledDataFromTest, globalVariables, io;
exports.timeOutArray = timeOutArray;
exports.abortController = abortController;
exports.globalTestConfig = globalTestConfig;
exports.globalVariables = globalVariables;
exports.io = io;
const initializeVariables = () => {
    exports.io = io = new socket_io_1.Server();
    io.emit = jest.fn();
    exports.timeOutArray = timeOutArray = [setTimeout(() => 0, 1000)];
    clearTimeout(timeOutArray[0]);
    exports.abortController = abortController = new abort_controller_1.default();
    exports.globalTestConfig = globalTestConfig = {
        rpsInterval: 100,
        startRPS: 100,
        endRPS: 100,
        testLength: 1,
        inputsData: [
            {
                method: 'GET',
                targetURL: 'http://localhost:3000',
                percentage: 100,
                jagTesterEnabled: true,
            },
        ],
    };
    timeArrRoutes = {
        // this key is used as the route name
        '/': {
            //this key is used as the rps number
            '100': {
                receivedTotalTime: 800,
                errorCount: 0,
                successfulResCount: 100,
            },
        },
    };
    // 2 average milliseconds for each, and last one should be 0 because the jagtester doesnt calculate the last one
    pulledDataFromTest = {
        '100': {
            //used as route
            '/': {
                '1': {
                    reqId: '1',
                    reqRoute: '/',
                    middlewares: [
                        { fnName: 'fn1', elapsedTime: 1 },
                        { fnName: 'fn2', elapsedTime: 1 },
                        { fnName: 'fn3', elapsedTime: 1 },
                        { fnName: 'fn4', elapsedTime: 0 },
                    ],
                },
                '2': {
                    reqId: '2',
                    reqRoute: '/',
                    middlewares: [
                        { fnName: 'fn1', elapsedTime: 3 },
                        { fnName: 'fn2', elapsedTime: 3 },
                        { fnName: 'fn3', elapsedTime: 3 },
                        { fnName: 'fn4', elapsedTime: 0 },
                    ],
                },
            },
        },
    };
    const isTestRunningListener = (val) => {
        io.emit(interfaces_1.ioSocketCommands.testRunningStateChange, val);
    };
    exports.globalVariables = globalVariables = {
        currentInterval: 100,
        errorCount: 0,
        successfulResCount: 100,
        abortController,
        timeArrRoutes,
        timeOutArray,
        pulledDataFromTest,
        isTestRunningInternal: true,
        isTestRunningListener,
        isTestRunning: true,
        agent: new http_1.default.Agent({ keepAlive: true }),
    };
};
exports.initializeVariables = initializeVariables;
