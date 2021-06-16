import { CollectedData, CollectedDataSingle, PulledDataFromTest } from './interfaces';
declare const processData: (data: CollectedData) => CollectedDataSingle;
declare const processLastMiddleware: (pulledDataFromTest: PulledDataFromTest, rps: string, route: string) => void;
declare const emitPercentage: (successfulResCount: number, errorCount: number, rpsGroup: number, secondsToTest: number) => void;
export { processData, processLastMiddleware, emitPercentage };
