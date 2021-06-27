import express from 'express';
// import fetch from 'node-fetch';
import http, { createServer } from 'http';
import { Server } from 'socket.io';
import allRPSfinished from '../src/server/helpers/allRPSfinished';
import AbortController from 'abort-controller';
import {
	ioSocketCommands,
	// Jagtestercommands,
	TimeArrRoutes,
	TestConfigData,
	GlobalVariables,
	PulledDataFromTest,
	middlewareSingle,
} from '../src/server/interfaces';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
io.emit = jest.fn();
describe('Testing allRPSfinished functionality', () => {
	let timoutCallCount,
		timeOutArray,
		abortController,
		globalTestConfig: TestConfigData,
		timeArrRoutes: TimeArrRoutes,
		pulledDataFromTest: PulledDataFromTest,
		globalVariables: GlobalVariables;
	beforeAll(() => {
		timoutCallCount = 0;
		timeOutArray = [setTimeout(() => timoutCallCount++, 1000)];
		abortController = new AbortController();
		globalTestConfig = {
			rpsInterval: 100,
			startRPS: 100,
			endRPS: 100,
			testLength: 1,
			inputsData: [
				{
					method: 'GET',
					targetURL: 'http://localhost:3000',
					percentage: 100,
					jagTesterEnabled: true,
				},
			],
		};

		timeArrRoutes = {
			// this key is used as the route name
			'/': {
				//this key is used as the rps number
				'100': {
					receivedTotalTime: 800, // 8 milliseconds for total
					errorCount: 0,
					successfulResCount: 100,
				},
			},
		};

		// 2 average milliseconds for each, and last one should be 0 because the jagtester doesnt calculate the last one
		pulledDataFromTest = {
			'100': {
				//used as route
				'/': {
					'1': {
						reqId: '1',
						reqRoute: '/',
						middlewares: [
							{ fnName: 'fn1', elapsedTime: 1 },
							{ fnName: 'fn2', elapsedTime: 1 },
							{ fnName: 'fn3', elapsedTime: 1 },
							{ fnName: 'fn4', elapsedTime: 0 },
						],
					},
					'2': {
						reqId: '2',
						reqRoute: '/',
						middlewares: [
							{ fnName: 'fn1', elapsedTime: 3 },
							{ fnName: 'fn2', elapsedTime: 3 },
							{ fnName: 'fn3', elapsedTime: 3 },
							{ fnName: 'fn4', elapsedTime: 0 },
						],
					},
				},
			},
		};

		globalVariables = {
			currentInterval: 100,
			errorCount: 0,
			successfulResCount: 100,
			abortController,
			timeArrRoutes,
			timeOutArray,
			pulledDataFromTest,
			isTestRunningInternal: true,
			isTestRunningListener: (val: boolean) => {
				io.emit(ioSocketCommands.testRunningStateChange, val);
			},
			isTestRunning: true,
			agent: new http.Agent({ keepAlive: true }),
		};

		allRPSfinished(globalTestConfig, io, globalVariables);
	});

	it('should assign a new instance of abortcontroller', () => {
		expect(globalVariables.abortController).not.toBe(abortController);
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
});

// httpServer.on('listening', function () {
// 	// console.log(`Fake server running on http://localhost:${port}`);

// 	const add = (a: number, b: number) => a + b;

// 	describe('test add function', () => {
// 		it('should return 15 for add(10,5)', () => {
// 			expect(add(10, 5)).toBe(15);
// 		});
// 		it('should return 5 for add(2,3)', () => {
// 			expect(add(2, 3)).toBe(5);
// 		});
// 	});
// 	httpServer.close();
// });

// httpServer.listen(port);
