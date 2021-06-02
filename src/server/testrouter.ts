import express from 'express';
import fetch from 'node-fetch';
import http from 'http';
import { TimeArrInterface, CollectedData, CollctedDataSingle, Jagtestercommands } from './interfaces';

const router = express.Router();
const testRequestRPS = 4500;
const testRequestSeconds = 3;
const timeArr: TimeArrInterface[] = [];
let errorCount = 0;
let successfulResCount = 0;
const agent = new http.Agent({ keepAlive: true });
const targetURL = 'http://localhost:3030/testroute';

const sendRequests = (rps: number, secondsToTest: number) => {
    const sendFetch = (reqId: number) => {
        const timeBefore = Date.now();
        fetch(targetURL, {
            agent,
            headers: {
                jagtestercommand: Jagtestercommands.running.toString(),
                jagtesterreqid: reqId.toString(),
            },
        })
            .then((res) => {
                successfulResCount++;
                let receivedTotalTime = 0;
                if (res.headers.has('x-response-time')) {
                    const xResponseTime = res.headers.get('x-response-time');
                    receivedTotalTime = xResponseTime ? +xResponseTime : 0;
                }
                timeArr.push({
                    receivedTotalTime,
                    recordedTotalTime: Date.now() - timeBefore,
                });
            })
            .catch(() => errorCount++);
    };

    // outer for loop to run for every second and set timeouts for after that second
    for (let j = 0; j < secondsToTest; j++) {
        for (let i = 0; i < rps; i++) {
            setTimeout(sendFetch.bind(this, i + j * rps), Math.floor(Math.random() * 1000 + 1000 * j));
        }
    }
};

router.get('/start', (req, res) => {
    fetch(targetURL, {
        agent,
        headers: {
            jagtestercommand: Jagtestercommands.updateLayer.toString(),
        },
    })
        .then(() => {
            timeArr.splice(0, timeArr.length);
            errorCount = 0;
            successfulResCount = 0;
            sendRequests(testRequestRPS, testRequestSeconds);
            res.send(`sent start request`);
        })
        .catch((err) => res.send(err));
});

router.get('/getlogs', (req, res) => {
    fetch(targetURL, {
        headers: {
            jagtestercommand: Jagtestercommands.endTest.toString(),
        },
    })
        .then((fetchRes) => fetchRes.json())
        .then((data) => {
            return res.json(processData(data));
        })
        .catch((err) => res.send(err)); // TODO add better error handling
});

const processData: (data: CollectedData) => CollctedDataSingle = (data: CollectedData) => {
    const collectedDataArr: CollctedDataSingle[] = [];
    for (const key in data) {
        collectedDataArr.push(data[key]);
    }

    // add middlewares elapsed times
    const collectedDataSingle: CollctedDataSingle = collectedDataArr.reduce((acc, cur) => {
        for (let i = 0; i < acc.middlewares.length; i++) {
            if (i < cur.middlewares.length) {
                acc.middlewares[i].elapsedTime += cur.middlewares[i].elapsedTime;
            }
        }
        return acc;
    });

    // divide by the count of requests
    collectedDataSingle.middlewares.forEach((middleware) => {
        middleware.elapsedTime = Math.round((100 * middleware.elapsedTime) / collectedDataArr.length) / 100;
    });

    let averagedTimeArr: TimeArrInterface = {
        receivedTotalTime: 0,
        recordedTotalTime: 0,
    };
    if (timeArr.length > 0) {
        averagedTimeArr = timeArr.reduce((acc, cur) => {
            const newAcc: TimeArrInterface = {
                receivedTotalTime: 0,
                recordedTotalTime: 0,
            };
            newAcc.receivedTotalTime = acc.receivedTotalTime + cur.receivedTotalTime;
            newAcc.recordedTotalTime = acc.recordedTotalTime + cur.recordedTotalTime;
            return newAcc;
        });
    }
    collectedDataSingle.recordedTime =
        Math.round((100 * averagedTimeArr.recordedTotalTime) / (testRequestRPS * testRequestSeconds - errorCount)) /
        100;
    collectedDataSingle.receivedTime =
        Math.round((100 * averagedTimeArr.receivedTotalTime) / (testRequestRPS * testRequestSeconds - errorCount)) /
        100;
    collectedDataSingle.errorCount = errorCount;
    collectedDataSingle.successfulResCount = successfulResCount;
    collectedDataSingle.requestCount = testRequestRPS * testRequestSeconds;
    collectedDataSingle.RPS = testRequestRPS;

    // setting the last middleware's elapsed time to the total minus the rest
    let sumOfMiddlewareTimes = 0;
    for (const time of collectedDataSingle.middlewares) sumOfMiddlewareTimes += time.elapsedTime;
    collectedDataSingle.middlewares[collectedDataSingle.middlewares.length - 1].elapsedTime =
        Math.round(100 * (collectedDataSingle.receivedTime - sumOfMiddlewareTimes)) / 100;
    return collectedDataSingle;
};

export default router;
