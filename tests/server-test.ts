import request from "supertest";
import express from "express";
// import targetURL from "../src/server/testrouter";
// import getMiddleware from "../lib/index";
// import request from 'request';
// import server from "../src/server/index"

const mServer = "http://localhost:5000";
let targetURL: any;
let server;
beforeAll(async () => {
  const mod = await import('../src/server/index');
  server = (mod as any).default;
});

afterAll(() => server.close());

//Tests -- server/index.ts
describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      it('Responds with status 200 and sends process.pid', () =>{
        return request(server)
          .get('/')
          .expect(200)
      })
    })
  })
})


//Tests -- server/testrouter.ts
describe('Test Route', () => {
  let mockServer;

  beforeAll(async() => {
    const mod = await import('../tests-server/mock-server');
    mockServer = (mod as any).default;
  })
  
  afterAll(() => mockServer.close());

  describe('/test/start', () => {
    describe('GET', () => {
      it('Should start test with appropriate headers', () => {
        //need to be able to set targetURL
        //this route needs to send json objects to be able to test.
        // targetURL = mServer;
        return request(server)
          .get('/test/start')
          .set("jagtestercommand", "0")
          .expect(200)
      })
    })
  })
})

