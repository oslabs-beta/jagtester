export interface TimeArrInterface {
    receivedTotalTime: number;
    recordedTotalTime: number;
}

export interface middlewareSingle {
    fnName: string;
    elapsedTime: number;
}

export interface CollectedData {
    [key: string]: {
        reqId: string;
        reqRoute: string;
        middlewares: middlewareSingle[];
    };
}

export interface CollectedDataSingle {
    receivedTime?: number;
    recordedTime?: number;
    errorCount?: number;
    requestCount?: number;
    successfulResCount?: number;
    RPS?: number;
    reqId?: string;
    reqRoute: string;
    middlewares: middlewareSingle[];
}

export enum Jagtestercommands {
    updateLayer,
    running,
    endTest,
}

export enum ioSocketCommands {
    testRunningStateChange = 'testRunningStateChange',
    singleRPSfinished = 'singleRPSfinished',
    allRPSfinished = 'allRPSfinished',
    errorInfo = 'errorInfo',
    currentRPSProgress = 'currentRPSProgress',
}

export interface TestConfigData {
    rpsInterval: number;
    startRPS: number;
    endRPS: number;
    testLength: number;
    inputsData: {
        method: string;
        targetURL: string;
        percentage: number;
        jagTesterEnabled: boolean;
    }[];
}

export interface PulledDataFromTest {
    [key: string]: {
        [key: string]: CollectedDataSingle | CollectedData;
    };
}

export interface AllPulledDataFromTest {
    testTime: number;
    testData: PulledDataFromTest;
}

export enum HTTPMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
    HEAD = 'HEAD',
    CONNECT = 'CONNECT',
    TRACE = 'TRACE',
}

export interface TimeArrRoutes {
    // this key is used as the route name
    [key: string]: {
        //this key is used as the rps number
        [key: string]: {
            receivedTotalTime: number;
            errorCount: number;
            successfulResCount: number;
        };
    };
}

export interface TrackedVariables {
    isTestRunningInternal: boolean;
    isTestRunningListener: (val: boolean) => void;
    isTestRunning: boolean;
}

export interface GlobalVariables {
    currentInterval: number;
    errorCount: number;
    successfulResCount: number;
    abortController: AbortController;
}
