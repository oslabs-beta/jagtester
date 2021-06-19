import {
    Jagtestercommands,
    TimeArrRoutes,
    TrackedVariables,
    GlobalVariables,
    TestConfigData,
    PulledDataFromTest,
} from '../interfaces';
import { Server } from 'socket.io';
import http from 'http';
import fetch from 'node-fetch';
import { AllRPSfinished } from './allRPSfinished';
import { SendRequests } from './sendRequests';
import { SingleRPSfinished } from './singleRPSfinished';
import { EmitPercentage } from './emitPercentage';

type SendRequestsAtRPS = (
    rpsInterval: number,
    startRPS: number,
    endRPS: number,
    testLength: number,
    inputsData: {
        method: string;
        targetURL: string;
        percentage: number;
    }[],
    globalVariables: GlobalVariables,
    allRPSfinished: AllRPSfinished,
    globalTestConfig: TestConfigData,
    io: Server,
    trackedVariables: TrackedVariables,
    timeOutArray: NodeJS.Timeout[],
    timeArrRoutes: TimeArrRoutes,
    pulledDataFromTest: PulledDataFromTest,
    agent: http.Agent,
    sendRequests: SendRequests,
    singleRPSfinished: SingleRPSfinished,
    emitPercentage: EmitPercentage
) => void;

const sendRequestsAtRPS: SendRequestsAtRPS = (
    rpsInterval: number,
    startRPS: number,
    endRPS: number,
    testLength: number,
    inputsData: {
        method: string;
        targetURL: string;
        percentage: number;
    }[],
    globalVariables: GlobalVariables,
    allRPSfinished: AllRPSfinished,
    globalTestConfig: TestConfigData,
    io: Server,
    trackedVariables: TrackedVariables,
    timeOutArray: NodeJS.Timeout[],
    timeArrRoutes: TimeArrRoutes,
    pulledDataFromTest: PulledDataFromTest,
    agent: http.Agent,
    sendRequests: SendRequests,
    singleRPSfinished: SingleRPSfinished,
    emitPercentage: EmitPercentage
) => {
    // check if finished testing
    const curRPS = startRPS + globalVariables.currentInterval * rpsInterval;

    const call_allRPSfinished = () => {
        allRPSfinished(
            globalTestConfig,
            io,
            globalVariables,
            trackedVariables,
            timeOutArray,
            timeArrRoutes,
            pulledDataFromTest
        );
    };

    if (curRPS > endRPS) {
        // eventEmitter.emit(ioSocketCommands.allRPSfinished);
        call_allRPSfinished();
        return;
    }

    // update layer first then start testing
    for (const target of inputsData) {
        fetch(target.targetURL, {
            agent,
            headers: {
                jagtestercommand: Jagtestercommands.updateLayer.toString(),
            },
        })
            .then(() => {
                // saving the resroute into the collection object
                const resRoute = new URL(target.targetURL).pathname;
                if (timeArrRoutes[resRoute] === undefined) {
                    timeArrRoutes[resRoute] = {};
                }
                if (timeArrRoutes[resRoute][curRPS.toString()] === undefined) {
                    timeArrRoutes[resRoute][curRPS.toString()] = {
                        receivedTotalTime: 0,
                        errorCount: 0,
                        successfulResCount: 0,
                    };
                }

                globalVariables.errorCount = 0;
                globalVariables.successfulResCount = 0;
                sendRequests(
                    target.targetURL,
                    curRPS,
                    Math.round((curRPS * target.percentage) / 100),
                    testLength,
                    agent,
                    timeArrRoutes,
                    trackedVariables,
                    globalVariables,
                    io,
                    timeOutArray,
                    singleRPSfinished,
                    allRPSfinished,
                    emitPercentage,
                    globalTestConfig,
                    pulledDataFromTest,
                    sendRequestsAtRPS
                );
            })
            .catch(() => {
                call_allRPSfinished();
            });
    }
};

export default sendRequestsAtRPS;
export type { SendRequestsAtRPS };
