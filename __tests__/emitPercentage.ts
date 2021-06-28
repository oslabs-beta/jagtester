import emitPercentage from '../src/server/helpers/emitPercentage';
import { ioSocketCommands } from '../src/server/interfaces';

import {
	globalVariables,
	io,
	initializeVariables,
	globalTestConfig,
} from '../__tests-server__/sampleTestVariables';

describe('Testing emitPercentage functionality', () => {
	beforeEach(() => {
		initializeVariables();
		emitPercentage(globalVariables, globalTestConfig.startRPS, globalTestConfig.testLength, io);
	});
	it('should emit 1 when the testing is finished', () => {
		expect(io.emit).toBeCalledTimes(1);
		expect(io.emit).toBeCalledWith(ioSocketCommands.currentRPSProgress, 1);
	});
});
