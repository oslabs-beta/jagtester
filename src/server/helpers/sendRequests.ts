import {
    Jagtestercommands,
    TimeArrRoutes,
    TrackedVariables,
    GlobalVariables,
    TestConfigData,
    PulledDataFromTest,
    AllPulledDataFromTest,
} from '../interfaces';

import type { SendRequestsAtRPS } from './sendRequestsAtRPS';

import fetch from 'node-fetch';
import http from 'http';
import { Server } from 'socket.io';
import type { SingleRPSfinished } from './singleRPSfinished';
import type { AllRPSfinished } from './allRPSfinished';

type SendRequests = (
    targetURL: string,
    rpsGroup: number,
    rpsActual: number,
    secondsToTest: number,
    agent: http.Agent,
    timeArrRoutes: TimeArrRoutes,
    trackedVariables: TrackedVariables,
    globalVariables: GlobalVariables,
    io: Server,
    timeOutArray: NodeJS.Timeout[],
    singleRPSfinished: SingleRPSfinished,
    allRPSfinished: AllRPSfinished,
    emitPercentage: (
        successfulResCount: number,
        errorCount: number,
        rpsGroup: number,
        secondsToTest: number,
        io: Server
    ) => void,
    globalTestConfig: TestConfigData,
    pulledDataFromTest: PulledDataFromTest,
    allPulledDataFromTest: AllPulledDataFromTest[],
    sendRequestsAtRPS: SendRequestsAtRPS
) => void;

const sendRequests: SendRequests = (
    targetURL: string,
    rpsGroup: number,
    rpsActual: number,
    secondsToTest: number,
    agent: http.Agent,
    timeArrRoutes: TimeArrRoutes,
    trackedVariables: TrackedVariables,
    globalVariables: GlobalVariables,
    io: Server,
    timeOutArray: NodeJS.Timeout[],
    singleRPSfinished: SingleRPSfinished,
    allRPSfinished: AllRPSfinished,
    emitPercentage: (
        successfulResCount: number,
        errorCount: number,
        rpsGroup: number,
        secondsToTest: number,
        io: Server
    ) => void,
    globalTestConfig: TestConfigData,
    pulledDataFromTest: PulledDataFromTest,
    allPulledDataFromTest: AllPulledDataFromTest[],
    sendRequestsAtRPS: SendRequestsAtRPS
) => {
    const sendFetch = (reqId: number) => {
        fetch(targetURL, {
            agent,
            signal: globalVariables.abortController.signal,
            headers: {
                jagtestercommand: Jagtestercommands.running.toString(),
                jagtesterreqid: reqId.toString(),
            },
        })
            .then((res) => {
                const resRoute = new URL(targetURL).pathname;
                timeArrRoutes[resRoute][rpsGroup].successfulResCount++;
                globalVariables.successfulResCount++;
                emitPercentage(
                    globalVariables.successfulResCount,
                    globalVariables.errorCount,
                    rpsGroup,
                    secondsToTest,
                    io
                );
                if (
                    globalVariables.successfulResCount + globalVariables.errorCount >=
                    rpsGroup * secondsToTest
                ) {
                    // eventEmitter.emit(ioSocketCommands.singleRPSfinished, rpsGroup);
                    singleRPSfinished(
                        rpsGroup,
                        io,
                        globalTestConfig,
                        globalVariables,
                        pulledDataFromTest,
                        allRPSfinished,
                        sendRequestsAtRPS,
                        trackedVariables,
                        timeOutArray,
                        timeArrRoutes,
                        allPulledDataFromTest,
                        agent,
                        sendRequests,
                        emitPercentage
                    );
                }
                if (res.headers.has('x-response-time')) {
                    const xResponseTime = res.headers.get('x-response-time');
                    timeArrRoutes[resRoute][rpsGroup].receivedTotalTime += xResponseTime
                        ? +xResponseTime
                        : 0;
                }
            })
            .catch((error) => {
                if (error.name === 'AbortError') {
                    if (trackedVariables.isTestRunning) {
                        trackedVariables.isTestRunning = false;
                        // eventEmitter.emit(ioSocketCommands.allRPSfinished);
                        allRPSfinished(
                            globalTestConfig,
                            io,
                            globalVariables,
                            trackedVariables,
                            timeOutArray,
                            timeArrRoutes,
                            pulledDataFromTest,
                            allPulledDataFromTest
                        );
                    }
                } else {
                    const resRoute = new URL(targetURL).pathname;
                    timeArrRoutes[resRoute][rpsGroup].errorCount++;
                    globalVariables.errorCount++;
                    emitPercentage(
                        globalVariables.successfulResCount,
                        globalVariables.errorCount,
                        rpsGroup,
                        secondsToTest,
                        io
                    );
                    if (
                        globalVariables.successfulResCount + globalVariables.errorCount >=
                        rpsGroup * secondsToTest
                    ) {
                        singleRPSfinished(
                            rpsGroup,
                            io,
                            globalTestConfig,
                            globalVariables,
                            pulledDataFromTest,
                            allRPSfinished,
                            sendRequestsAtRPS,
                            trackedVariables,
                            timeOutArray,
                            timeArrRoutes,
                            allPulledDataFromTest,
                            agent,
                            sendRequests,
                            emitPercentage
                        );
                    }
                }
            });
    };

    // outer for loop to run for every second and set timeouts for after that second
    for (let j = 0; j < secondsToTest; j++) {
        for (let i = 0; i < rpsActual; i++) {
            const timeout = setTimeout(
                sendFetch.bind(this, i + j * rpsActual),
                Math.floor(Math.random() * 1000 + 1000 * j)
            );
            timeOutArray.push(timeout);
        }
    }
    return;
};

export default sendRequests;
export type { SendRequests };
