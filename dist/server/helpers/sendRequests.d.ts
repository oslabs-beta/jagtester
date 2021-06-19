/// <reference types="node" />
import { TimeArrRoutes, TrackedVariables, GlobalVariables, TestConfigData, PulledDataFromTest } from '../interfaces';
import type { SendRequestsAtRPS } from './sendRequestsAtRPS';
import http from 'http';
import { Server } from 'socket.io';
import type { SingleRPSfinished } from './singleRPSfinished';
import type { AllRPSfinished } from './allRPSfinished';
declare type SendRequests = (targetURL: string, rpsGroup: number, rpsActual: number, secondsToTest: number, agent: http.Agent, timeArrRoutes: TimeArrRoutes, trackedVariables: TrackedVariables, globalVariables: GlobalVariables, io: Server, timeOutArray: NodeJS.Timeout[], singleRPSfinished: SingleRPSfinished, allRPSfinished: AllRPSfinished, emitPercentage: (successfulResCount: number, errorCount: number, rpsGroup: number, secondsToTest: number, io: Server) => void, globalTestConfig: TestConfigData, pulledDataFromTest: PulledDataFromTest, sendRequestsAtRPS: SendRequestsAtRPS) => void;
declare const sendRequests: SendRequests;
export default sendRequests;
export type { SendRequests };
