import express from 'express';
import path from 'path';
import testRouter from './testrouter';
// TODO use cluster to imrpove our server performance
import { createServer } from 'http';

import { Server } from 'socket.io';

const app = express();
const http = createServer(app);
const io = new Server(http);
let port = 15000;

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use('/', express.static(path.join(__dirname, '../client')));

app.use('/api', testRouter);

app.get(['/', '/results'], (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.use('/*', (req, res) => {
    res.redirect('/');
});

http.on('error', function (e: NodeJS.ErrnoException) {
    if (e.code === 'EADDRINUSE') {
        port++;
        http.listen(port);
    }
});

http.on('listening', function () {
    console.log(`Jagtester running on http://localhost:${port}`);
});

http.listen(port);

export { io };
