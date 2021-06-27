#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.http = void 0;
// TODO use cluster to imrpove our server performance
const app_1 = require("./app");
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const http = http_1.createServer(app_1.app);
exports.http = http;
const io = new socket_io_1.Server(http);
exports.io = io;
