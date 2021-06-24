import allRPSfinished from '../src/server/helpers/allRPSfinished';
import AbortController from 'abort-controller';
import http from 'http';
import {
	ioSocketCommands,
	Jagtestercommands,
	CollectedData,
	TimeArrRoutes,
	TestConfigData,
	GlobalVariables,
} from '../src/server/interfaces';

const globalTestConfig: TestConfigData = {
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

const timeArrRoutes: TimeArrRoutes = {
	// this key is used as the route name
	'/': {
		//this key is used as the rps number
		'100': {
			receivedTotalTime: 10,
			errorCount: 0,
			successfulResCount: 100,
		},
	},
};
let timoutCallCount = 0;
const timeOutArray = [setTimeout(() => timoutCallCount++, 1000)];

// const globalVariables: GlobalVariables = {
// 	currentInterval: 100,
// 	errorCount: 0,
// 	successfulResCount: 100,
// 	abortController: new AbortController(),
// 	timeArrRoutes: timeArrRoutes,
// 	timeOutArray: timeOutArray,
// 	pulledDataFromTest: PulledDataFromTest,
// 	isTestRunningInternal: boolean,
// 	isTestRunningListener: (val: boolean) => {
// 		io.emit(ioSocketCommands.testRunningStateChange, val);
// 	},
// 	isTestRunning: true,
// 	agent: new http.Agent({ keepAlive: true }),
// }

const add = (a: number, b: number) => a + b;

describe('test add function', () => {
	it('should return 15 for add(10,5)', () => {
		expect(add(10, 5)).toBe(15);
	});
	it('should return 5 for add(2,3)', () => {
		expect(add(2, 3)).toBe(5);
	});
});
