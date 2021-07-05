import { Jagtestercommands, GlobalVariables, TestConfigData } from '../interfaces';
import { Server } from 'socket.io';
import fetch from 'node-fetch';
import allRPSfinished from './allRPSfinished';
import sendRequests from './sendRequests';

type SendRequestsAtRPS = (
	globalVariables: GlobalVariables,
	globalTestConfig: TestConfigData,
	io: Server
) => void;

const sendRequestsAtRPS: SendRequestsAtRPS = (
	globalVariables: GlobalVariables,
	globalTestConfig: TestConfigData,
	io: Server
) => {
	// check if finished testing
	const curRPS =
		globalTestConfig.startRPS + globalVariables.currentInterval * globalTestConfig.rpsInterval;

	if (curRPS > globalTestConfig.endRPS) {
		allRPSfinished(globalTestConfig, io, globalVariables);
		return;
	}

	// update layer first then start testing
	for (const target of globalTestConfig.inputsData) {
		fetch(target.targetURL, {
			agent: globalVariables.agent,
			headers: {
				jagtestercommand: Jagtestercommands.updateLayer.toString(),
			},
		})
			.then(() => {
				// saving the resroute into the collection object
				const resRoute = new URL(target.targetURL).pathname;
				if (globalVariables.timeArrRoutes[resRoute] === undefined) {
					globalVariables.timeArrRoutes[resRoute] = {};
				}
				if (globalVariables.timeArrRoutes[resRoute][curRPS.toString()] === undefined) {
					globalVariables.timeArrRoutes[resRoute][curRPS.toString()] = {
						receivedTotalTime: 0,
						errorCount: 0,
						successfulResCount: 0,
					};
				}

				globalVariables.errorCount = 0;
				globalVariables.successfulResCount = 0;
				sendRequests(
					target.targetURL,
					curRPS,
					Math.round((curRPS * target.percentage) / 100),
					globalTestConfig.testLength,
					globalVariables,
					io,
					globalTestConfig
				);
			})
			.catch(() => {
				allRPSfinished(globalTestConfig, io, globalVariables);
			});
	}
};

export default sendRequestsAtRPS;
export type { SendRequestsAtRPS };
