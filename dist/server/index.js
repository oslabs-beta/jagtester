#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const testrouter_1 = __importDefault(require("./testrouter"));
// TODO use cluster to imrpove our server performance
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const app = express_1.default();
const http = http_1.createServer(app);
const io = new socket_io_1.Server(http);
exports.io = io;
let port = 15000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/', express_1.default.static(path_1.default.join(__dirname, '../client')));
app.use('/api', testrouter_1.default);
app.get(['/', '/results'], (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../client/index.html'));
});
app.use('/*', (req, res) => {
    res.redirect('/');
});
http.on('error', function (e) {
    if (e.code === 'EADDRINUSE') {
        port++;
        http.listen(port);
    }
});
http.on('listening', function () {
    console.log(`Jagtester running on http://localhost:${port}`);
});
http.listen(port);
