import fetch from 'node-fetch';
import { Server } from 'socket.io';
import http from 'http';
import {
    ioSocketCommands,
    Jagtestercommands,
    GlobalVariables,
    TestConfigData,
    PulledDataFromTest,
    TrackedVariables,
    TimeArrRoutes,
} from '../interfaces';
import type { AllRPSfinished } from './allRPSfinished';
import { EmitPercentage } from './emitPercentage';
import { SendRequests } from './sendRequests';
import type { SendRequestsAtRPS } from './sendRequestsAtRPS';

type SingleRPSfinished = (
    rpsGroup: number,
    io: Server,
    globalTestConfig: TestConfigData,
    globalVariables: GlobalVariables,
    pulledDataFromTest: PulledDataFromTest,
    allRPSfinished: AllRPSfinished,
    sendRequestsAtRPS: SendRequestsAtRPS,
    trackedVariables: TrackedVariables,
    timeOutArray: NodeJS.Timeout[],
    timeArrRoutes: TimeArrRoutes,
    agent: http.Agent,
    sendRequests: SendRequests,
    emitPercentage: EmitPercentage
) => void;

const singleRPSfinished: SingleRPSfinished = (
    rpsGroup: number,
    io: Server,
    globalTestConfig: TestConfigData,
    globalVariables: GlobalVariables,
    pulledDataFromTest: PulledDataFromTest,
    allRPSfinished: AllRPSfinished,
    sendRequestsAtRPS: SendRequestsAtRPS,
    trackedVariables: TrackedVariables,
    timeOutArray: NodeJS.Timeout[],
    timeArrRoutes: TimeArrRoutes,
    agent: http.Agent,
    sendRequests: SendRequests,
    emitPercentage: EmitPercentage
) => {
    io.emit(ioSocketCommands.singleRPSfinished, rpsGroup);
    const { rpsInterval, startRPS, endRPS, testLength, inputsData } = globalTestConfig;

    fetch(globalTestConfig.inputsData[0].targetURL, {
        headers: {
            jagtestercommand: Jagtestercommands.endTest.toString(),
        },
    })
        .then((fetchRes) => fetchRes.json())
        .then((data) => {
            const curRPS = startRPS + globalVariables.currentInterval * rpsInterval;
            pulledDataFromTest[curRPS.toString()] = data;
            globalVariables.currentInterval++;
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
                agent,
                sendRequests,
                singleRPSfinished,
                emitPercentage
            );
        })
        .catch(() => {
            // eventEmitter.emit(ioSocketCommands.allRPSfinished);
            allRPSfinished(
                globalTestConfig,
                io,
                globalVariables,
                trackedVariables,
                timeOutArray,
                timeArrRoutes,
                pulledDataFromTest
            );
        });
};

export default singleRPSfinished;
export type { SingleRPSfinished };
