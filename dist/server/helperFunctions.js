"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitPercentage = exports.processLastMiddleware = exports.processData = void 0;
const interfaces_1 = require("./interfaces");
const index_1 = require("./index");
const processData = (data) => {
    const collectedDataArr = [];
    for (const key in data) {
        collectedDataArr.push(data[key]);
    }
    // add middlewares elapsed times
    const collectedDataSingle = collectedDataArr.reduce((acc, cur) => {
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
exports.processData = processData;
const processLastMiddleware = (pulledDataFromTest, rps, route) => {
    const indexOfLast = pulledDataFromTest[rps][route].middlewares.length - 1;
    const tempMiddleware = {
        fnName: 'temp',
        elapsedTime: 0,
    };
    pulledDataFromTest[rps][route].middlewares[indexOfLast].elapsedTime =
        Math.round(100 *
            (pulledDataFromTest[rps][route].receivedTime -
                pulledDataFromTest[rps][route].middlewares.reduce((acc, cur) => {
                    acc.elapsedTime += cur.elapsedTime;
                    return acc;
                }, tempMiddleware).elapsedTime)) / 100;
};
exports.processLastMiddleware = processLastMiddleware;
const emitPercentage = (successfulResCount, errorCount, rpsGroup, secondsToTest) => {
    const percent = (successfulResCount + errorCount) / (rpsGroup * secondsToTest);
    if (Math.floor(10000 * percent) % 1000 === 0) {
        index_1.io.emit(interfaces_1.ioSocketCommands.currentRPSProgress, percent);
    }
};
exports.emitPercentage = emitPercentage;
