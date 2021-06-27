import http from 'http';
import { Server } from 'socket.io';
import AbortController from 'abort-controller';
import {
	ioSocketCommands,
	TimeArrRoutes,
	TestConfigData,
	GlobalVariables,
	PulledDataFromTest,
} from './interfaces';

let timeOutArray,
	abortController,
	globalTestConfig: TestConfigData,
	timeArrRoutes: TimeArrRoutes,
	pulledDataFromTest: PulledDataFromTest,
	globalVariables: GlobalVariables,
	io: Server;

const initializeVariables: () => void = () => {
	io = new Server();
	io.emit = jest.fn();
	timeOutArray = [setTimeout(() => 0, 1000)];
	clearTimeout(timeOutArray[0]);
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

	const isTestRunningListener: (val: boolean) => void = (val: boolean) => {
		io.emit(ioSocketCommands.testRunningStateChange, val);
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
		isTestRunningListener,
		isTestRunning: true,
		agent: new http.Agent({ keepAlive: true }),
	};
};
// const initializeEmitPercentage = () => {

// }
export {
	globalTestConfig,
	timeOutArray,
	abortController,
	globalVariables,
	io,
	initializeVariables,
};
