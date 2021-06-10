import express from 'express';
import testRouter from './testrouter';
// TODO use cluster to imrpove our server performance
import { createServer } from 'http';

import { Server, Socket } from 'socket.io';

const app = express();
const http = createServer(app);
const io = new Server(http);
const port = 5000;

io.on('connection', (socket: Socket) => {
    console.log('socket io on connection');
    socket.on('disconnect', (reason: string) => {
        console.log('A user disconnected, reason is ', reason);
    });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/', (_, res) => {
    res.send(`Worker ${process.pid} responds`); // TODO make this serve the build folder
});

app.use('/api', testRouter);

http.listen(port, function () {
    console.log(`listening on ${port}`);
});
export { io };

// app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
