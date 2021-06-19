import fetch from 'node-fetch';
import { Server } from 'socket.io';
import AbortController from 'abort-controller';
import {
    ioSocketCommands,
    Jagtestercommands,
    CollectedData,
    TestConfigData,
    TimeArrRoutes,
    TrackedVariables,
    PulledDataFromTest,
    GlobalVariables,
} from '../interfaces';

import processData from './processData';
import processLastMiddleware from './processLastMiddleware';

type AllRPSfinished = (
    globalTestConfig: TestConfigData,
    io: Server,
    globalVariables: GlobalVariables,
    trackedVariables: TrackedVariables,
    timeOutArray: NodeJS.Timeout[],
    timeArrRoutes: TimeArrRoutes,
    pulledDataFromTest: PulledDataFromTest
) => void;

const allRPSfinished: AllRPSfinished = (
    globalTestConfig: TestConfigData,
    io: Server,
    globalVariables: GlobalVariables,
    trackedVariables: TrackedVariables,
    timeOutArray: NodeJS.Timeout[],
    timeArrRoutes: TimeArrRoutes,
    pulledDataFromTest: PulledDataFromTest
) => {
    fetch(globalTestConfig.inputsData[0].targetURL, {
        headers: {
            jagtestercommand: Jagtestercommands.endTest.toString(),
        },
    }).catch((err) => {
        io.emit(ioSocketCommands.errorInfo, err.toString());
    });
    globalVariables.abortController = new AbortController();
    trackedVariables.isTestRunning = false;

    // clear timeouts
    for (const timeout of timeOutArray) {
        clearTimeout(timeout);
    }
    timeOutArray.splice(0, timeOutArray.length);

    // getting the average response time, since we had the total response times added together
    for (const route in timeArrRoutes) {
        for (const rpsGroup in timeArrRoutes[route]) {
            timeArrRoutes[route][rpsGroup].receivedTotalTime =
                Math.round(
                    (1000 * timeArrRoutes[route][rpsGroup].receivedTotalTime) /
                        timeArrRoutes[route][rpsGroup].successfulResCount
                ) / 1000;
        }
    }

    // processing middlewares, averaging them, then combining timearrroutes
    for (const rps in pulledDataFromTest) {
        for (const route in pulledDataFromTest[rps]) {
            pulledDataFromTest[rps][route] = processData(
                pulledDataFromTest[rps][route] as CollectedData
            );
            pulledDataFromTest[rps][route].receivedTime =
                timeArrRoutes[route][rps].receivedTotalTime;
            pulledDataFromTest[rps][route].errorCount = timeArrRoutes[route][rps].errorCount;
            pulledDataFromTest[rps][route].successfulResCount =
                timeArrRoutes[route][rps].successfulResCount;

            //fixing the elapsed time for the last middleware
            processLastMiddleware(pulledDataFromTest, rps, route);
        }
    }

    if (Object.keys(pulledDataFromTest).length > 0) {
        const newPulledData = {
            testTime: Date.now(),
            testData: pulledDataFromTest,
        };
        io.emit(ioSocketCommands.allRPSfinished, [newPulledData]);
    }
};

export default allRPSfinished;
export type { AllRPSfinished };
