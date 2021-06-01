export interface TimeArrInterface {
    receivedTotalTime: number;
    recordedTotalTime: number;
}

export interface CollectedData {
    [key: string]: {
        reqId: string;
        reqRoute: string;
        middlewares: {
            fnName: string;
            elapsedTime: number;
        }[];
    };
}

export interface CollctedDataSingle {
    receivedTime?: number;
    recordedTime?: number;
    errorCount?: number;
    requestCount?: number;
    reqId?: string;
    reqRoute: string;
    middlewares: {
        fnName: string;
        elapsedTime: number;
    }[];
}

export enum Jagtestercommands {
    updateLayer,
    running,
    endTest,
}
