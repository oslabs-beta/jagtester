import express from 'express';
import fetch from 'node-fetch';
import http from 'http';

enum Jagtestercommands {
    updateLayer,
    running,
    endTest,
    resetCollectedData,
}
const router = express.Router();
const testRequestRPS = 3000;
const testRequestSeconds = 3;
const timeArr: TimeArrInterface[] = [];
let errorCount = 0;
const agent = new http.Agent({ keepAlive: true });
const targetURL = 'http://localhost:3030/';

interface TimeArrInterface {
    receivedTotalTime: number;
    recordedTotalTime: number;
}

// interface for collected data, it will be averaged out before sending back to front end
interface CollctedDataSingle {
    receivedTime: number;
    recordedTime: number;
    errorCount: number;
    requestCount: number;
    reqId?: string;
    reqRoute: string;
    middlewares: {
        fnName: string;
        elapsedTime: number;
    }[];
}

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
            sendRequests(testRequestRPS, testRequestSeconds);
            res.send(`sent start request`);
        })
        .catch((err) => res.send(err));
});

router.get('/getlogs', (req, res) => {
    console.table(timeArr);
    console.log(`error count: ${errorCount}`);
    res.send(`Worker ${process.pid} responds`);
});

router.get('/getbackendlogs', (req, res) => {
    fetch(targetURL, {
        headers: {
            jagtestercommand: Jagtestercommands.endTest.toString(),
        },
    })
        .then((fetchRes) => fetchRes.json())
        .then((data) => {
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
                Math.round((100 * averagedTimeArr.recordedTotalTime) / (testRequestRPS * testRequestSeconds - errorCount)) / 100;
            collectedDataSingle.receivedTime =
                Math.round((100 * averagedTimeArr.receivedTotalTime) / (testRequestRPS * testRequestSeconds - errorCount)) / 100;
            collectedDataSingle.errorCount = errorCount;
            collectedDataSingle.requestCount = testRequestRPS * testRequestSeconds;

            // setting the last middleware's elapsed time to the total minus the rest
            let sumOfMiddlewareTimes = 0;
            for (const time of collectedDataSingle.middlewares) sumOfMiddlewareTimes += time.elapsedTime;
            collectedDataSingle.middlewares[collectedDataSingle.middlewares.length - 1].elapsedTime =
                collectedDataSingle.receivedTime - sumOfMiddlewareTimes;

            return res.json(collectedDataSingle);
        })
        .catch((err) => res.send(err)); // TODO add better error handling
});

router.get('/resetclientbackendlogs', (req, res) => {
    fetch(targetURL, {
        headers: {
            jagtestercommand: Jagtestercommands.resetCollectedData.toString(),
        },
    })
        .then((fetchRes) => res.send(fetchRes))
        .catch((err) => res.send(err)); // TODO add better error handling
});

export default router;
