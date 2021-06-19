import { Server } from 'socket.io';
import { GlobalVariables, TestConfigData } from '../interfaces';
declare type SingleRPSfinished = (rpsGroup: number, io: Server, globalTestConfig: TestConfigData, globalVariables: GlobalVariables) => void;
declare const singleRPSfinished: SingleRPSfinished;
export default singleRPSfinished;
export type { SingleRPSfinished };
