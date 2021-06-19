/// <reference types="node" />
import { TimeArrRoutes, TrackedVariables, GlobalVariables, TestConfigData, PulledDataFromTest } from '../interfaces';
import { Server } from 'socket.io';
import http from 'http';
import { AllRPSfinished } from './allRPSfinished';
import { SendRequests } from './sendRequests';
import { SingleRPSfinished } from './singleRPSfinished';
import { EmitPercentage } from './emitPercentage';
declare type SendRequestsAtRPS = (rpsInterval: number, startRPS: number, endRPS: number, testLength: number, inputsData: {
    method: string;
    targetURL: string;
    percentage: number;
}[], globalVariables: GlobalVariables, allRPSfinished: AllRPSfinished, globalTestConfig: TestConfigData, io: Server, trackedVariables: TrackedVariables, timeOutArray: NodeJS.Timeout[], timeArrRoutes: TimeArrRoutes, pulledDataFromTest: PulledDataFromTest, agent: http.Agent, sendRequests: SendRequests, singleRPSfinished: SingleRPSfinished, emitPercentage: EmitPercentage) => void;
declare const sendRequestsAtRPS: SendRequestsAtRPS;
export default sendRequestsAtRPS;
export type { SendRequestsAtRPS };
