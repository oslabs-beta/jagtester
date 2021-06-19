import { CollectedData, CollectedDataSingle } from '../interfaces';
declare type ProcessData = (data: CollectedData) => CollectedDataSingle;
declare const processData: ProcessData;
export default processData;
export type { ProcessData };
