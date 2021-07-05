import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
	verbose: true,
	preset: 'ts-jest',
	testEnvironment: 'node',
};
export default config;
