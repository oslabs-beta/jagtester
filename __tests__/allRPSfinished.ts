import { ioSocketCommands, middlewareSingle, Jagtestercommands } from '../src/server/interfaces';
import fetch from 'node-fetch';
jest.mock('node-fetch', () =>
	jest.fn(() => {
		return Promise.resolve();
	})
);
import allRPSfinished from '../src/server/helpers/allRPSfinished';
import {
	globalTestConfig,
	abortController,
	globalVariables,
	io,
	initializeVariables,
} from '../__tests-server__/sampleTestVariables';

describe('Testing allRPSfinished functionality', () => {
	beforeEach(() => {
		initializeVariables();
		allRPSfinished(globalTestConfig, io, globalVariables);
	});
	it('should assign a new instance of abortcontroller', () => {
		expect(globalVariables.abortController).not.toBe(abortController);
	});
	it('should not have an aborted signal', () => {
		expect(!globalVariables.abortController.signal.aborted);
	});
	it('should switch off is test running boolean', () => {
		expect(globalVariables.isTestRunning).toEqual(false);
	});
	it('should clear timeout array', () => {
		expect(globalVariables.timeOutArray.length).toEqual(0);
	});
	it('should divide the received total time (sum of all responses) by the response count', () => {
		expect(globalVariables.timeArrRoutes['/']['100'].receivedTotalTime).toEqual(8);
	});
	it('process middlewares, average them, combine timearrroutes.', () => {
		for (const middleware of globalVariables.pulledDataFromTest['100']['/']
			.middlewares as middlewareSingle[]) {
			expect(middleware.elapsedTime).toEqual(2);
		}
	});
	it('should call emit with new test data on IO when done testing', () => {
		expect(io.emit).toBeCalledTimes(1);
		expect(io.emit).toBeCalledWith(ioSocketCommands.allRPSfinished, [
			expect.objectContaining({
				testTime: expect.anything(),
				testData: globalVariables.pulledDataFromTest,
			}),
		]);
	});
	it('should call fetch with correct header jagtester command', () => {
		expect(fetch).toBeCalledWith(globalTestConfig.inputsData[0].targetURL, {
			headers: {
				jagtestercommand: Jagtestercommands.endTest.toString(),
			},
		});
	});
});
