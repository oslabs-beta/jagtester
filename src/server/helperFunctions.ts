import {
    CollectedData,
    CollectedDataSingle,
    PulledDataFromTest,
    middlewareSingle,
} from './interfaces';

import { io } from './index';

const processData: (data: CollectedData) => CollectedDataSingle = (data: CollectedData) => {
    const collectedDataArr: CollectedDataSingle[] = [];
    for (const key in data) {
        collectedDataArr.push(data[key]);
    }

    // add middlewares elapsed times
    const collectedDataSingle: CollectedDataSingle = collectedDataArr.reduce((acc, cur) => {
        for (let i = 0; i < acc.middlewares.length; i++) {
            if (i < cur.middlewares.length) {
                acc.middlewares[i].elapsedTime += cur.middlewares[i].elapsedTime;
            }
        }
        return acc;
    });

    // divide by the count of requests
    collectedDataSingle.middlewares.forEach((middleware) => {
        middleware.elapsedTime =
            Math.round((100 * middleware.elapsedTime) / collectedDataArr.length) / 100;
    });

    return collectedDataSingle;
};

const processLastMiddleware: (
    pulledDataFromTest: PulledDataFromTest,
    rps: string,
    route: string
) => void = (pulledDataFromTest, rps, route) => {
    const indexOfLast =
        (pulledDataFromTest[rps][route].middlewares as middlewareSingle[]).length - 1;
    const tempMiddleware: middlewareSingle = {
        fnName: 'temp',
        elapsedTime: 0,
    };

    (pulledDataFromTest[rps][route].middlewares as middlewareSingle[])[indexOfLast].elapsedTime =
        Math.round(
            100 *
                ((pulledDataFromTest[rps][route].receivedTime as number) -
                    (pulledDataFromTest[rps][route].middlewares as middlewareSingle[]).reduce(
                        (acc, cur) => {
                            acc.elapsedTime += cur.elapsedTime;
                            return acc;
                        },
                        tempMiddleware
                    ).elapsedTime)
        ) / 100;
};

const emitPercentage: (
    successfulResCount: number,
    errorCount: number,
    rpsGroup: number,
    secondsToTest: number
) => void = (successfulResCount, errorCount, rpsGroup, secondsToTest) => {
    const percent = (successfulResCount + errorCount) / (rpsGroup * secondsToTest);
    if (Math.floor(10000 * percent) % 1000 === 0) {
        io.emit('currentRPSProgress', percent);
    }
};

export { processData, processLastMiddleware, emitPercentage };
