import { CollectedData, CollectedDataSingle, PulledDataFromTest } from './interfaces';
declare const processData: (data: CollectedData) => CollectedDataSingle;
declare const processLastMiddleware: (pulledDataFromTest: PulledDataFromTest, rps: string, route: string) => void;
export { processData, processLastMiddleware };
