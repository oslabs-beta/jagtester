import { app } from '../src/server/app';
import request from 'supertest';

describe('All endpoints', () => {
	it('respond with html content on route "/"', async () => {
		await request(app).get('/').expect('Content-Type', /html/).expect(200);
	});
});
