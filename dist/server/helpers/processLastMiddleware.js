"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = processLastMiddleware;
