"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("../interfaces");
const emitPercentage = (globalVariables, rpsGroup, secondsToTest, io) => {
    const percent = (globalVariables.successfulResCount + globalVariables.errorCount) /
        (rpsGroup * secondsToTest);
    if (Math.floor(10000 * percent) % 1000 === 0) {
        io.emit(interfaces_1.ioSocketCommands.currentRPSProgress, percent);
    }
};
exports.default = emitPercentage;
