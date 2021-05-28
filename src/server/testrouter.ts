import express from 'express';
import fetch, { FetchError } from 'node-fetch';
import http from 'http';

enum Jagtestercommands {
    updateLayer,
    running,
    endTest,
    resetCollectedData,
}
const router = express.Router();
const timeArr: number[] = [];
let errorCount = 0;
const agent = new http.Agent({ keepAlive: true });
const targetURL = 'http://localhost:3030/testroute';
interface CollctedDataSingle {
    reqId?: string;
    reqRoute: string;
    middlewares: {
        fnName: string;
        elapsedTime: number;
    }[];
}

const sendRequests = (rps: number) => {
    for (let i = 0; i < rps; i++) {
        const sendFetch = () => {
            const timeBefore = Date.now();
            fetch(targetURL, {
                agent,
                headers: {
                    jagtestercommand: Jagtestercommands.running.toString(),
                    jagtesterreqid: i.toString(),
                },
            })
                .then(() => {
                    timeArr.push(Date.now() - timeBefore);
                })
                .catch(() => errorCount++);
        };
        setTimeout(sendFetch, Math.floor(Math.random() * 1000));
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
            sendRequests(4000);
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
            Object.keys(data).forEach((reqId: string) => {
                collectedDataArr.push(data[reqId]);
            });
            const collectedDataSingle: CollctedDataSingle =
                collectedDataArr.reduce((acc, cur) => {
                    for (let i = 0; i < acc.middlewares.length; i++) {
                        if (i < cur.middlewares.length) {
                            acc.middlewares[i].elapsedTime +=
                                cur.middlewares[i].elapsedTime;
                        }
                    }
                    return acc;
                });

            collectedDataSingle.middlewares.forEach((middleware) => {
                middleware.elapsedTime =
                    Math.round(
                        (1e2 * middleware.elapsedTime) / collectedDataArr.length
                    ) / 1e2;
            });

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
