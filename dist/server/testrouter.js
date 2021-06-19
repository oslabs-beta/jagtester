"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const http_1 = __importDefault(require("http"));
const index_1 = require("./index");
const interfaces_1 = require("./interfaces");
const sendRequests_1 = __importDefault(require("./helpers/sendRequests"));
const singleRPSfinished_1 = __importDefault(require("./helpers/singleRPSfinished"));
const emitPercentage_1 = __importDefault(require("./helpers/emitPercentage"));
const allRPSfinished_1 = __importDefault(require("./helpers/allRPSfinished"));
const sendRequestsAtRPS_1 = __importDefault(require("./helpers/sendRequestsAtRPS"));
const abort_controller_1 = __importDefault(require("abort-controller"));
const router = express_1.default.Router();
const globalVariables = {
    currentInterval: 0,
    errorCount: 0,
    successfulResCount: 0,
    abortController: new abort_controller_1.default(),
};
let timeArrRoutes = {};
const allPulledDataFromTest = [];
let pulledDataFromTest = {};
let globalTestConfig;
const timeOutArray = [];
const trackedVariables = {
    isTestRunningInternal: false,
    isTestRunningListener: (val) => {
        index_1.io.emit(interfaces_1.ioSocketCommands.testRunningStateChange, val);
    },
    set isTestRunning(val) {
        this.isTestRunningInternal = val;
        this.isTestRunningListener(val);
    },
    get isTestRunning() {
        return this.isTestRunningInternal;
    },
};
const agent = new http_1.default.Agent({ keepAlive: true });
router.post('/startmultiple', (req, res) => {
    if (!trackedVariables.isTestRunning) {
        trackedVariables.isTestRunning = true;
        timeArrRoutes = {};
        pulledDataFromTest = {};
        globalVariables.currentInterval = 0;
        globalTestConfig = {
            rpsInterval: req.body.rpsInterval,
            startRPS: req.body.startRPS,
            endRPS: req.body.endRPS,
            testLength: req.body.testLength,
            inputsData: req.body.inputsData,
        };
        const { rpsInterval, startRPS, endRPS, testLength, inputsData } = req.body;
        sendRequestsAtRPS_1.default(rpsInterval, startRPS, endRPS, testLength, inputsData, globalVariables, allRPSfinished_1.default, globalTestConfig, index_1.io, trackedVariables, timeOutArray, timeArrRoutes, pulledDataFromTest, allPulledDataFromTest, agent, sendRequests_1.default, singleRPSfinished_1.default, emitPercentage_1.default);
    }
    res.sendStatus(200);
});
router.post('/checkjagtester', (req, res) => {
    node_fetch_1.default(req.body.inputURL, {
        method: req.body.method,
        agent,
        headers: {
            jagtestercommand: interfaces_1.Jagtestercommands.updateLayer.toString(),
        },
    })
        .then((fetchRes) => fetchRes.json())
        .then((data) => res.json(data))
        .catch(() => res.json({ jagtester: false }));
});
router.get('/stopTest', (req, res) => {
    globalVariables.abortController.abort();
    res.sendStatus(200);
});
router.delete('/saveddata', (req, res) => {
    allPulledDataFromTest.splice(0, allPulledDataFromTest.length);
    res.sendStatus(200);
});
router.delete('/singledata/:index', (req, res) => {
    if (req.params.index && Number(req.params.index) < allPulledDataFromTest.length) {
        allPulledDataFromTest.splice(Number(req.params.index), 1);
    }
    res.sendStatus(200);
});
exports.default = router;
