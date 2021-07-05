import { app } from '../src/server/app';
import request from 'supertest';
import { globalVariables } from '../src/server/testrouter';
// import fetch from 'node-fetch';
jest.mock('node-fetch', () =>
	jest.fn(() => {
		return Promise.resolve({
			json: () => Promise.resolve({ jagtester: true }),
		});
	})
);
import { globalTestConfig, initializeVariables } from '../__tests-server__/sampleTestVariables';

describe('Jag server (mocked fetch)', () => {
	beforeAll(() => {
		initializeVariables();
	});
	describe('GET', () => {
		it('route / should respond with html content', async () => {
			await request(app).get('/').expect('Content-Type', /html/).expect(200);
		});
		it('route /api/stopTest should respond with 200 and have signal be aborted', async () => {
			await request(app)
				.get('/api/stopTest')
				.expect(200)
				.then(() => {
					expect(globalVariables.abortController.signal.aborted);
				});
		});
	});

	describe('POST /api/checkjagtester', () => {
		it('Should return jagtester true', async () => {
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
});
