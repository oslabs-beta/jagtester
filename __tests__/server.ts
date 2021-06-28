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

describe('Jag server (mocked fetch)', () => {
	beforeAll(async () => {
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

describe('Jag Server tests', () => {
	let server;
	let mockServer;

	beforeAll(async () => {
		initializeVariables();
		const mod = await import('../src/server/index');
		server = (mod as unknown)['default'];
		const mod2 = await import('../__tests-server__/mock-server');
		mockServer = (mod2 as unknown)['default'];
	});

	afterAll(() => {
		if (mockServer) mockServer.close();
		if (server) server.close();
	});

	describe('Mock Server', () => {
		it('Should start test server', (done) => {
			request(mockServer).get('/').expect(200);
			done();
		});
	});
	describe('jag Server', () => {
		describe('GET', () => {
			it('Responds with status 200', (done) => {
				request(server).get('/').expect(200);
				done();
			});
		});
	});
	//need to include tests for websockets
	//api testing (testrouter.ts)
	describe('/api/', () => {
		describe('/checkjagtester', () => {
			describe('POST', () => {
				it('Should check if Jagtester is enabled on mockserver', (done) => {
					request(server)
						.post('/api/checkjagtester')
						.send({ inputURL: 'http://localhost:5001' })
						// .set('req.body.method', should be post??)
						.expect({ jagtester: true })
						.expect(200);

					done();
				});
			});
		});
	});
});
