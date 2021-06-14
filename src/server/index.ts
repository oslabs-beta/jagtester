import express from 'express';
import path from 'path';
import testRouter from './testrouter';
// TODO use cluster to imrpove our server performance
import { createServer } from 'http';

import { Server } from 'socket.io';

const app = express();
const http = createServer(app);
const io = new Server(http);
const port = 5000;

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use('/', express.static(path.join(__dirname, '../clientbuild')));

app.get(['/', '/results'], (_, res) => {
    res.sendFile(path.join(__dirname, '../clientbuild/index.html')); // TODO make this serve the build folder
});

app.use('/api', testRouter);

http.listen(port, function () {
    console.log(`listening on ${port}`);
});
export { io };
