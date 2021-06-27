#!/usr/bin/env node
/// <reference types="node" />
import { Server } from 'socket.io';
declare const http: import("http").Server;
declare const io: Server<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap>;
export { http, io };
