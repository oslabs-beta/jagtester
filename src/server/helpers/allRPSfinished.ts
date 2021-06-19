import fetch from 'node-fetch';
import { Server } from 'socket.io';
import AbortController from 'abort-controller';
import {
    ioSocketCommands,
    Jagtestercommands,
    CollectedData,
    TestConfigData,
    GlobalVariables,
} from '../interfaces';

import processData from './processData';
import processLastMiddleware from './processLastMiddleware';

type AllRPSfinished = (
    globalTestConfig: TestConfigData,
    io: Server,
    globalVariables: GlobalVariables
) => void;

const allRPSfinished: AllRPSfinished = (
    globalTestConfig: TestConfigData,
    io: Server,
    globalVariables: GlobalVariables
) => {
    fetch(globalTestConfig.inputsData[0].targetURL, {
        headers: {
            jagtestercommand: Jagtestercommands.endTest.toString(),
        },
    }).catch((err) => {
        io.emit(ioSocketCommands.errorInfo, err.toString());
    });
    globalVariables.abortController = new AbortController();
    globalVariables.isTestRunning = false;

    // clear timeouts
    for (const timeout of globalVariables.timeOutArray) {
        clearTimeout(timeout);
    }
    globalVariables.timeOutArray.splice(0, globalVariables.timeOutArray.length);

    // getting the average response time, since we had the total response times added together
    for (const route in globalVariables.timeArrRoutes) {
        for (const rpsGroup in globalVariables.timeArrRoutes[route]) {
            globalVariables.timeArrRoutes[route][rpsGroup].receivedTotalTime =
                Math.round(
                    (1000 * globalVariables.timeArrRoutes[route][rpsGroup].receivedTotalTime) /
                        globalVariables.timeArrRoutes[route][rpsGroup].successfulResCount
                ) / 1000;
        }
    }

    // processing middlewares, averaging them, then combining timearrroutes
    for (const rps in globalVariables.pulledDataFromTest) {
        for (const route in globalVariables.pulledDataFromTest[rps]) {
            globalVariables.pulledDataFromTest[rps][route] = processData(
                globalVariables.pulledDataFromTest[rps][route] as CollectedData
            );
            globalVariables.pulledDataFromTest[rps][route].receivedTime =
                globalVariables.timeArrRoutes[route][rps].receivedTotalTime;
            globalVariables.pulledDataFromTest[rps][route].errorCount =
                globalVariables.timeArrRoutes[route][rps].errorCount;
            globalVariables.pulledDataFromTest[rps][route].successfulResCount =
                globalVariables.timeArrRoutes[route][rps].successfulResCount;

            //fixing the elapsed time for the last middleware
            processLastMiddleware(globalVariables.pulledDataFromTest, rps, route);
        }
    }

    if (Object.keys(globalVariables.pulledDataFromTest).length > 0) {
        const newPulledData = {
            testTime: Date.now(),
            testData: globalVariables.pulledDataFromTest,
        };
        io.emit(ioSocketCommands.allRPSfinished, [newPulledData]);
    }
};

export default allRPSfinished;
export type { AllRPSfinished };
