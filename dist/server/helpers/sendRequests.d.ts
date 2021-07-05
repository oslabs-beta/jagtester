import { GlobalVariables, TestConfigData } from '../interfaces';
import { Server } from 'socket.io';
declare type SendRequests = (targetURL: string, rpsGroup: number, rpsActual: number, secondsToTest: number, globalVariables: GlobalVariables, io: Server, globalTestConfig: TestConfigData) => void;
declare const sendRequests: SendRequests;
export default sendRequests;
export type { SendRequests };
