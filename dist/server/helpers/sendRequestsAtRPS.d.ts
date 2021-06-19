import { GlobalVariables, TestConfigData } from '../interfaces';
import { Server } from 'socket.io';
declare type SendRequestsAtRPS = (globalVariables: GlobalVariables, globalTestConfig: TestConfigData, io: Server) => void;
declare const sendRequestsAtRPS: SendRequestsAtRPS;
export default sendRequestsAtRPS;
export type { SendRequestsAtRPS };
