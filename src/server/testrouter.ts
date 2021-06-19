import express from 'express';
import fetch from 'node-fetch';
import http from 'http';
import { io } from './index';
import {
    PulledDataFromTest,
    AllPulledDataFromTest,
    Jagtestercommands,
    TestConfigData,
    ioSocketCommands,
    TimeArrRoutes,
    TrackedVariables,
    GlobalVariables,
} from './interfaces';

import sendRequests from './helpers/sendRequests';
import singleRPSfinished from './helpers/singleRPSfinished';
import emitPercentage from './helpers/emitPercentage';
import allRPSfinished from './helpers/allRPSfinished';
import sendRequestsAtRPS from './helpers/sendRequestsAtRPS';

import AbortController from 'abort-controller';

const router = express.Router();

const globalVariables: GlobalVariables = {
    currentInterval: 0,
    errorCount: 0,
    successfulResCount: 0,
    abortController: new AbortController(),
};

let timeArrRoutes: TimeArrRoutes = {};

const allPulledDataFromTest: AllPulledDataFromTest[] = [];
let pulledDataFromTest: PulledDataFromTest = {};
let globalTestConfig: TestConfigData;
const timeOutArray: NodeJS.Timeout[] = [];

const trackedVariables: TrackedVariables = {
    isTestRunningInternal: false,
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

const agent = new http.Agent({ keepAlive: true });

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
        sendRequestsAtRPS(
            rpsInterval,
            startRPS,
            endRPS,
            testLength,
            inputsData,
            globalVariables,
            allRPSfinished,
            globalTestConfig,
            io,
            trackedVariables,
            timeOutArray,
            timeArrRoutes,
            pulledDataFromTest,
            allPulledDataFromTest,
            agent,
            sendRequests,
            singleRPSfinished,
            emitPercentage
        );
    }
    res.sendStatus(200);
});
router.post('/checkjagtester', (req, res) => {
    fetch(req.body.inputURL, {
        method: req.body.method,
        agent,
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

export default router;
