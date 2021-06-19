import { Jagtestercommands, GlobalVariables, TestConfigData } from '../interfaces';

import fetch from 'node-fetch';
import { Server } from 'socket.io';
import singleRPSfinished from './singleRPSfinished';
import allRPSfinished from './allRPSfinished';
import emitPercentage from './emitPercentage';

type SendRequests = (
    targetURL: string,
    rpsGroup: number,
    rpsActual: number,
    secondsToTest: number,
    globalVariables: GlobalVariables,
    io: Server,
    globalTestConfig: TestConfigData
) => void;

const sendRequests: SendRequests = (
    targetURL: string,
    rpsGroup: number,
    rpsActual: number,
    secondsToTest: number,
    globalVariables: GlobalVariables,
    io: Server,
    globalTestConfig: TestConfigData
) => {
    const sendFetch = (reqId: number) => {
        fetch(targetURL, {
            agent: globalVariables.agent,
            signal: globalVariables.abortController.signal,
            headers: {
                jagtestercommand: Jagtestercommands.running.toString(),
                jagtesterreqid: reqId.toString(),
            },
        })
            .then((res) => {
                const resRoute = new URL(targetURL).pathname;
                globalVariables.timeArrRoutes[resRoute][rpsGroup].successfulResCount++;
                globalVariables.successfulResCount++;
                emitPercentage(globalVariables, rpsGroup, secondsToTest, io);
                if (
                    globalVariables.successfulResCount + globalVariables.errorCount >=
                    rpsGroup * secondsToTest
                ) {
                    singleRPSfinished(rpsGroup, io, globalTestConfig, globalVariables);
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
                        allRPSfinished(globalTestConfig, io, globalVariables);
                    }
                } else {
                    const resRoute = new URL(targetURL).pathname;
                    globalVariables.timeArrRoutes[resRoute][rpsGroup].errorCount++;
                    globalVariables.errorCount++;
                    emitPercentage(globalVariables, rpsGroup, secondsToTest, io);
                    if (
                        globalVariables.successfulResCount + globalVariables.errorCount >=
                        rpsGroup * secondsToTest
                    ) {
                        singleRPSfinished(rpsGroup, io, globalTestConfig, globalVariables);
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
            globalVariables.timeOutArray.push(timeout);
        }
    }
    return;
};

export default sendRequests;
export type { SendRequests };
