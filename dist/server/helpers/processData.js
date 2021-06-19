"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = processData;
