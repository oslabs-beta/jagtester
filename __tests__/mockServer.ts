import mockApp from '../__tests-server__/mock-server';
import request from 'supertest';
import { Jagtestercommands } from '../src/server/interfaces';
// import fetch from 'node-fetch';
jest.mock('node-fetch', () =>
	jest.fn(() => {
		return Promise.resolve({
			json: () => Promise.resolve({ jagtester: true }),
		});
	})
);
describe('Mock Server', () => {
	it('Should start test server', async () => {
		await request(mockApp).get('/').expect(200);
	});
	it('Should respond with {jagtester: true} when receives the update layer headers', async () => {
		await request(mockApp)
			.get('/')
			.set({ jagtestercommand: Jagtestercommands.updateLayer.toString() })
			.expect({ jagtester: true })
			.expect(200);
	});
	it('Should respond with {} when receives the end test  headers without starting test', async () => {
		await request(mockApp).get('/');
		await request(mockApp)
			.get('/')
			.set({ jagtestercommand: Jagtestercommands.endTest.toString() })
			.expect({})
			.expect(200);
	});
	it('should return collected data object after updating the layer, sending a request then calling endtest', async () => {
		await request(mockApp)
			.get('/')
			.set({ jagtestercommand: Jagtestercommands.updateLayer.toString() });

		await request(mockApp).get('/').set({
			jagtestercommand: Jagtestercommands.running.toString(),
			jagtesterreqid: 1,
		});
		await request(mockApp)
			.get('/')
			.set({ jagtestercommand: Jagtestercommands.endTest.toString() })
			.set('Accept', 'application/json')
			.expect(200)
			.then((res) => {
				expect(res.body).toEqual(
					expect.objectContaining({
						'/': {
							'1': {
								reqId: '1',
								reqRoute: '/',
								middlewares: expect.arrayContaining([
									expect.objectContaining({
										fnName: expect.any(String),
										elapsedTime: expect.any(Number),
									}),
								]),
							},
						},
					})
				);
			});
	});
});
