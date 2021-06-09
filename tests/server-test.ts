import request from "supertest";
import express from "express";
// import router from "../src/server/testrouter"
import {app} from "../src/server/index";
// import testRouter from '../src/server/testrouter';
import { timeArrRoutes, pulledDataFromTest, currentInterval, globalTestConfig } from "../src/server/testrouter"
// import {trackedVariables} from "../src/server/testrouter";

// import targetURL from "../src/server/testrouter";
// import getMiddleware from "../lib/index";
// import request from 'request';

//Tests -- server/testrouter.ts
//Tests -- server/index.ts


describe('Jag Server tests', () => {
  let server;
  let mockServer;
  
  beforeAll(async () => {
    const mod = await import('../src/server/index');
    server = (mod as any).default;
  });
  
  beforeAll(async() => {
    const mod2 = await import('../tests-server/mock-server');
    mockServer = (mod2 as any).default;
  })
  
  afterAll(() =>{
    if(mockServer) 
       mockServer.close()
    });
  
  afterAll(() => {
    if(server)
       server.close()
  });

  describe('Mock Server', () => {
    jest.setTimeout(30000);
    it('Should start test server', (done) => {
      request(mockServer)
        .get('/')
        .expect(200)
      done();
    })
  
  })
  describe('jag Server', () => {
    describe('GET', () => {
      it('Responds with status 200', (done) =>{
        request(server)
          .get('/')
          .expect(200)
        done();
      })
    })
  })
  //need to include tests for websockets
  //api testing (testrouter.ts) 
  describe('/api/', () => {
    describe('/checkjagtester', () => {
      describe('POST', () => {
        it('Should check if Jagtester is enabled on mockserver', (done) =>{
          request(server)
            .post('/api/checkjagtester')
            .send({inputURL: 'http://localhost:5001'})
            // .set('req.body.method', should be post??)
            .expect({ jagtester: true })
            .expect(200);

          done();
        })
      })
    })


    describe('/startmultiple', () => {
      describe('POST', () => {
        it('If no tests are running, should set test data to empty and pull test parameters from req.body', (done) =>{
          console.log(timeArrRoutes)
          request(server)
            .post('/api/startmultiple')
            // .set('trackedVariables.isTestRunning', false)
            .send({
              rpsInterval: 10,
              startRPS: 100,
              endRPS: 100,
              testLength: 1,
              inputsData: {
                method: 'GET',
                targetURL: 'http://localhost:5001',
                percentage: [100],
                jagTesterEnabled: true,
              }
            })
            // .expect(timeArrRoutes).to.equal({})
            .expect(200);
            // .expect(trackedVariables.trackedVariables.isTestRunning).to.equal(true)

          
          done();
        })
      })
    })
  })
})