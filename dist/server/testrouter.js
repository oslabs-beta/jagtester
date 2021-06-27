"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const http_1 = __importDefault(require("http"));
const server_1 = require("./server");
const interfaces_1 = require("./interfaces");
const sendRequestsAtRPS_1 = __importDefault(require("./helpers/sendRequestsAtRPS"));
const abort_controller_1 = __importDefault(require("abort-controller"));
const router = express_1.default.Router();
const globalVariables = {
    currentInterval: 0,
    errorCount: 0,
    successfulResCount: 0,
    abortController: new abort_controller_1.default(),
    timeArrRoutes: {},
    timeOutArray: [],
    pulledDataFromTest: {},
    isTestRunningInternal: false,
    agent: new http_1.default.Agent({ keepAlive: true }),
    isTestRunningListener: (val) => {
        server_1.io.emit(interfaces_1.ioSocketCommands.testRunningStateChange, val);
    },
    set isTestRunning(val) {
        this.isTestRunningInternal = val;
        this.isTestRunningListener(val);
    },
    get isTestRunning() {
        return this.isTestRunningInternal;
    },
};
let globalTestConfig;
router.post('/startmultiple', (req, res) => {
    if (!globalVariables.isTestRunning) {
        globalVariables.isTestRunning = true;
        globalVariables.timeArrRoutes = {};
        globalVariables.pulledDataFromTest = {};
        globalVariables.currentInterval = 0;
        globalTestConfig = {
            rpsInterval: req.body.rpsInterval,
            startRPS: req.body.startRPS,
            endRPS: req.body.endRPS,
            testLength: req.body.testLength,
            inputsData: req.body.inputsData,
        };
        sendRequestsAtRPS_1.default(globalVariables, globalTestConfig, server_1.io);
    }
    res.sendStatus(200);
});
router.post('/checkjagtester', (req, res) => {
    node_fetch_1.default(req.body.inputURL, {
        method: req.body.method,
        agent: globalVariables.agent,
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
exports.default = router;
