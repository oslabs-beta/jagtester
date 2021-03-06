import { CollectedData, CollectedDataSingle } from '../interfaces';

type ProcessData = (data: CollectedData) => CollectedDataSingle;
const processData: ProcessData = (data: CollectedData) => {
	const collectedDataArr: CollectedDataSingle[] = [];
	for (const key in data) {
		collectedDataArr.push(data[key]);
	}

	// add middlewares elapsed times
	const collectedDataSingle: CollectedDataSingle = collectedDataArr.reduce((acc, cur) => {
		for (let i = 0; i < acc.middlewares.length && i < cur.middlewares.length; i++) {
			acc.middlewares[i].elapsedTime += cur.middlewares[i].elapsedTime;
		}
		return acc;
	});

	// divide by the count of requests
	collectedDataSingle.middlewares.forEach((middleware) => {
		middleware.elapsedTime =
			Math.round((100 * middleware.elapsedTime) / collectedDataArr.length) / 100;
	});

	return collectedDataSingle;
};

export default processData;
export type { ProcessData };
