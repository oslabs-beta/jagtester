import { PulledDataFromTest } from '../interfaces';
declare type ProcessLastMiddleware = (pulledDataFromTest: PulledDataFromTest, rps: string, route: string) => void;
declare const processLastMiddleware: ProcessLastMiddleware;
export default processLastMiddleware;
export type { ProcessLastMiddleware };
