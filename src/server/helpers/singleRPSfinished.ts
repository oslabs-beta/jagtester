import fetch from 'node-fetch';
import { Server } from 'socket.io';
import {
	ioSocketCommands,
	Jagtestercommands,
	GlobalVariables,
	TestConfigData,
} from '../interfaces';
import allRPSfinished from './allRPSfinished';
import sendRequestsAtRPS from './sendRequestsAtRPS';

type SingleRPSfinished = (
	rpsGroup: number,
	io: Server,
	globalTestConfig: TestConfigData,
	globalVariables: GlobalVariables
) => void;

const singleRPSfinished: SingleRPSfinished = (
	rpsGroup: number,
	io: Server,
	globalTestConfig: TestConfigData,
	globalVariables: GlobalVariables
) => {
	io.emit(ioSocketCommands.singleRPSfinished, rpsGroup);
	fetch(globalTestConfig.inputsData[0].targetURL, {
		headers: {
			jagtestercommand: Jagtestercommands.endTest.toString(),
		},
	})
		.then((fetchRes) => fetchRes.json())
		.then((data) => {
			const curRPS =
				globalTestConfig.startRPS +
				globalVariables.currentInterval * globalTestConfig.rpsInterval;
			globalVariables.pulledDataFromTest[curRPS.toString()] = data;
			globalVariables.currentInterval++;
			sendRequestsAtRPS(globalVariables, globalTestConfig, io);
		})
		.catch(() => {
			allRPSfinished(globalTestConfig, io, globalVariables);
		});
};

export default singleRPSfinished;
export type { SingleRPSfinished };
