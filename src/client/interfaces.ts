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

export interface CollectedDataSingle {
    receivedTime?: number;
    recordedTime?: number;
    errorCount?: number;
    requestCount?: number;
    successfulResCount?: number;
    RPS?: number;
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
        [key: string]: CollectedDataSingle;
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

export interface ChartDataSet {
    type: string;
    label: string;
    data: number[];
    backgroundColor: string[];
    borderWidth: number;
    borderColor?: string;
    fill?: boolean;
    yAxisID?: string;
}
