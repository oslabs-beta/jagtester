import { Server } from 'socket.io';
import { TestConfigData, GlobalVariables } from './interfaces';
declare let timeOutArray: any, abortController: any, globalTestConfig: TestConfigData, globalVariables: GlobalVariables, io: Server;
declare const initializeVariables: () => void;
export { globalTestConfig, timeOutArray, abortController, globalVariables, io, initializeVariables, };
