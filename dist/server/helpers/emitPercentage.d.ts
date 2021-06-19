import { Server } from 'socket.io';
import { GlobalVariables } from '../interfaces';
declare type EmitPercentage = (globalVariables: GlobalVariables, rpsGroup: number, secondsToTest: number, io: Server) => void;
declare const emitPercentage: EmitPercentage;
export default emitPercentage;
export type { EmitPercentage };
