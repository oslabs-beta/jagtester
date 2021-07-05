import { PulledDataFromTest, middlewareSingle } from '../interfaces';

type ProcessLastMiddleware = (
	pulledDataFromTest: PulledDataFromTest,
	rps: string,
	route: string
) => void;

const processLastMiddleware: ProcessLastMiddleware = (pulledDataFromTest, rps, route) => {
	const indexOfLast =
		(pulledDataFromTest[rps][route].middlewares as middlewareSingle[]).length - 1;
	const tempMiddleware: middlewareSingle = {
		fnName: 'temp',
		elapsedTime: 0,
	};

	(pulledDataFromTest[rps][route].middlewares as middlewareSingle[])[indexOfLast].elapsedTime =
		Math.round(
			100 *
				((pulledDataFromTest[rps][route].receivedTime as number) -
					(pulledDataFromTest[rps][route].middlewares as middlewareSingle[]).reduce(
						(acc, cur) => {
							acc.elapsedTime += cur.elapsedTime;
							return acc;
						},
						tempMiddleware
					).elapsedTime)
		) / 100;
};

export default processLastMiddleware;
export type { ProcessLastMiddleware };
