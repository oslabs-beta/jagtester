import { app } from '../src/server/app';
import request from 'supertest';
// import fetch from 'node-fetch';
jest.mock('node-fetch', () =>
	jest.fn(() => {
		return Promise.resolve({
			json: () => Promise.resolve({ jagtester: true }),
		});
	})
);
import { globalTestConfig, initializeVariables } from '../src/server/sampleTestVariables';

describe('All endpoints', () => {
	beforeAll(() => {
		initializeVariables();
	});
	it('respond with html content on route "/"', async () => {
		await request(app).get('/').expect('Content-Type', /html/).expect(200);
	});
	it('should return jagtester true when posting to api/checkjagtester', async () => {
		await request(app)
			.post('/api/checkjagtester')
			.send({
				inputURL: globalTestConfig.inputsData[0].targetURL,
				method: globalTestConfig.inputsData[0].method,
			})
			.expect('Content-Type', /json/)
			.expect({ jagtester: true })
			.expect(200);
	});
});
