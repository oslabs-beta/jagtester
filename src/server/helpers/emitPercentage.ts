import { Server } from 'socket.io';
import { ioSocketCommands } from '../interfaces';

type EmitPercentage = (
    successfulResCount: number,
    errorCount: number,
    rpsGroup: number,
    secondsToTest: number,
    io: Server
) => void;

const emitPercentage: EmitPercentage = (
    successfulResCount,
    errorCount,
    rpsGroup,
    secondsToTest,
    io
) => {
    const percent = (successfulResCount + errorCount) / (rpsGroup * secondsToTest);
    if (Math.floor(10000 * percent) % 1000 === 0) {
        io.emit(ioSocketCommands.currentRPSProgress, percent);
    }
};

export default emitPercentage;
export type { EmitPercentage };
