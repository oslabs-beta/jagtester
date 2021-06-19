/// <reference types="node" />
import { Server } from 'socket.io';
import { TestConfigData, TimeArrRoutes, TrackedVariables, PulledDataFromTest, AllPulledDataFromTest, GlobalVariables } from '../interfaces';
declare type AllRPSfinished = (globalTestConfig: TestConfigData, io: Server, globalVariables: GlobalVariables, trackedVariables: TrackedVariables, timeOutArray: NodeJS.Timeout[], timeArrRoutes: TimeArrRoutes, pulledDataFromTest: PulledDataFromTest, allPulledDataFromTest: AllPulledDataFromTest[]) => void;
declare const allRPSfinished: AllRPSfinished;
export default allRPSfinished;
export type { AllRPSfinished };
