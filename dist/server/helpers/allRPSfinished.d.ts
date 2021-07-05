import { Server } from 'socket.io';
import { TestConfigData, GlobalVariables } from '../interfaces';
declare type AllRPSfinished = (globalTestConfig: TestConfigData, io: Server, globalVariables: GlobalVariables) => void;
declare const allRPSfinished: AllRPSfinished;
export default allRPSfinished;
export type { AllRPSfinished };
