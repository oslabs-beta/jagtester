/// <reference types="node" />
import { CollectedData, CollectedDataSingle, PulledDataFromTest, TimeArrRoutes, TrackedVariables, GlobalVariables } from './interfaces';
import AbortController from 'abort-controller';
import http from 'http';
import { Server } from 'socket.io';
declare const processData: (data: CollectedData) => CollectedDataSingle;
declare const processLastMiddleware: (pulledDataFromTest: PulledDataFromTest, rps: string, route: string) => void;
declare const emitPercentage: (successfulResCount: number, errorCount: number, rpsGroup: number, secondsToTest: number, io: Server) => void;
declare const sendRequests: (targetURL: string, rpsGroup: number, rpsActual: number, secondsToTest: number, agent: http.Agent, abortController: AbortController, timeArrRoutes: TimeArrRoutes, trackedVariables: TrackedVariables, globalVariables: GlobalVariables, io: Server, timeOutArray: NodeJS.Timeout[], singleRPSfinished: (rpsGroup: number) => void, allRPSfinished: () => void, emitPercentage: (successfulResCount: number, errorCount: number, rpsGroup: number, secondsToTest: number, io: Server) => void) => void;
export { processData, processLastMiddleware, emitPercentage, sendRequests };
