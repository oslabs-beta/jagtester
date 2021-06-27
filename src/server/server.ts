#!/usr/bin/env node
// TODO use cluster to imrpove our server performance
import { app } from './app';
import { createServer } from 'http';
import { Server } from 'socket.io';

const http = createServer(app);
const io = new Server(http);

export { http, io };
