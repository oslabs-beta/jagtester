import { Server } from 'socket.io';
declare type EmitPercentage = (successfulResCount: number, errorCount: number, rpsGroup: number, secondsToTest: number, io: Server) => void;
declare const emitPercentage: EmitPercentage;
export default emitPercentage;
export type { EmitPercentage };
