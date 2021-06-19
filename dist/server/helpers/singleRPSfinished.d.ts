/// <reference types="node" />
import { Server } from 'socket.io';
import http from 'http';
import { GlobalVariables, TestConfigData, PulledDataFromTest, TrackedVariables, TimeArrRoutes, AllPulledDataFromTest } from '../interfaces';
import type { AllRPSfinished } from './allRPSfinished';
import { EmitPercentage } from './emitPercentage';
import { SendRequests } from './sendRequests';
import type { SendRequestsAtRPS } from './sendRequestsAtRPS';
declare type SingleRPSfinished = (rpsGroup: number, io: Server, globalTestConfig: TestConfigData, globalVariables: GlobalVariables, pulledDataFromTest: PulledDataFromTest, allRPSfinished: AllRPSfinished, sendRequestsAtRPS: SendRequestsAtRPS, trackedVariables: TrackedVariables, timeOutArray: NodeJS.Timeout[], timeArrRoutes: TimeArrRoutes, allPulledDataFromTest: AllPulledDataFromTest[], agent: http.Agent, sendRequests: SendRequests, emitPercentage: EmitPercentage) => void;
declare const singleRPSfinished: SingleRPSfinished;
export default singleRPSfinished;
export type { SingleRPSfinished };
