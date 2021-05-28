import express from 'express';
import testRouter from './testrouter';
// TODO use cluster to imrpove our server performance

const app = express();
const port = 5000;

app.get('/', (_, res) => {
    res.send(`Worker ${process.pid} responds`);
});

app.use('/test', testRouter);

app.listen(port, () => console.log(`Running on on port ${port}`));

console.log(`Worker ${process.pid} started`);
