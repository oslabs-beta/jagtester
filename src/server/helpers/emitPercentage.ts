import { Server } from 'socket.io';
import { GlobalVariables, ioSocketCommands } from '../interfaces';

type EmitPercentage = (
    globalVariables: GlobalVariables,
    rpsGroup: number,
    secondsToTest: number,
    io: Server
) => void;

const emitPercentage: EmitPercentage = (globalVariables, rpsGroup, secondsToTest, io) => {
    const percent =
        (globalVariables.successfulResCount + globalVariables.errorCount) /
        (rpsGroup * secondsToTest);
    if (Math.floor(10000 * percent) % 1000 === 0) {
        io.emit(ioSocketCommands.currentRPSProgress, percent);
    }
};

export default emitPercentage;
export type { EmitPercentage };
