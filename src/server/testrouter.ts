import express from 'express';
import fetch from 'node-fetch';
import http from 'http';
import { io } from './index';
import { Jagtestercommands, TestConfigData, ioSocketCommands, GlobalVariables } from './interfaces';

import sendRequestsAtRPS from './helpers/sendRequestsAtRPS';

import AbortController from 'abort-controller';

const router = express.Router();

const globalVariables: GlobalVariables = {
    currentInterval: 0,
    errorCount: 0,
    successfulResCount: 0,
    abortController: new AbortController(),
    timeArrRoutes: {},
    timeOutArray: [],
    pulledDataFromTest: {},
    isTestRunningInternal: false,
    agent: new http.Agent({ keepAlive: true }),
    isTestRunningListener: (val: boolean) => {
        io.emit(ioSocketCommands.testRunningStateChange, val);
    },
    set isTestRunning(val: boolean) {
        this.isTestRunningInternal = val;
        this.isTestRunningListener(val);
    },
    get isTestRunning() {
        return this.isTestRunningInternal;
    },
};

let globalTestConfig: TestConfigData;

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

        sendRequestsAtRPS(globalVariables, globalTestConfig, io);
    }
    res.sendStatus(200);
});
router.post('/checkjagtester', (req, res) => {
    fetch(req.body.inputURL, {
        method: req.body.method,
        agent: globalVariables.agent,
        headers: {
            jagtestercommand: Jagtestercommands.updateLayer.toString(),
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

export default router;
