import singleRPSfinished from '../src/server/helpers/singleRPSfinished';
import { ioSocketCommands, Jagtestercommands } from '../src/server/interfaces';
import fetch from 'node-fetch';
import {
	globalVariables,
	io,
	initializeVariables,
	globalTestConfig,
} from '../src/server/sampleTestVariables';

jest.mock('node-fetch', () =>
	jest.fn(() => {
		return Promise.resolve({
      json: () => Promise.resolve(globalVariables.pulledDataFromTest[globalVariables.currentInterval])
    });
	})
);

let originalPulledData
describe('Testing singleRPSfinished functionality', () =>{
  beforeEach(() =>{
    initializeVariables();
    originalPulledData = globalVariables.pulledDataFromTest;
    globalVariables.pulledDataFromTest = {};
    singleRPSfinished(globalTestConfig.rpsInterval, io, globalTestConfig, globalVariables)
  });
  it('should call emit singleRPS finished with rpsGroup', () => {
    expect(io.emit).toBeCalledTimes(1)
    expect(io.emit).toBeCalledWith(ioSocketCommands.singleRPSfinished, globalTestConfig.rpsInterval)
  });
  it('should call fetch with correct header jagtester command and return correct response data', async () =>{
    expect(fetch).toBeCalledWith(globalTestConfig.inputsData[0].targetURL, {
			headers: {
				jagtestercommand: Jagtestercommands.endTest.toString(),
			}
    }) 
    expect(globalVariables.pulledDataFromTest[globalVariables.currentInterval]).toEqual(originalPulledData[globalVariables.currentInterval])
  })
})