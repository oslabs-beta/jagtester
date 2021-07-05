#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// TODO use cluster to imrpove our server performance
const server_1 = require("./server");
const open_1 = __importDefault(require("open"));
let port = 15000;
server_1.http.on('error', function (e) {
    if (e.code === 'EADDRINUSE') {
        port++;
        server_1.http.listen(port);
    }
});
const server = server_1.http.on('listening', function () {
    console.log(`Jagtester running on http://localhost:${port}`);
    open_1.default(`http://localhost:${port}`).catch((err) => console.log(err));
});
server_1.http.listen(port);
exports.default = server;
