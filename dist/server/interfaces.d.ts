/// <reference types="node" />
import http from 'http';
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
export declare enum Jagtestercommands {
    updateLayer = 0,
    running = 1,
    endTest = 2
}
export declare enum ioSocketCommands {
    testRunningStateChange = "testRunningStateChange",
    singleRPSfinished = "singleRPSfinished",
    allRPSfinished = "allRPSfinished",
    errorInfo = "errorInfo",
    currentRPSProgress = "currentRPSProgress"
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
export declare enum HTTPMethods {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH",
    HEAD = "HEAD",
    CONNECT = "CONNECT",
    TRACE = "TRACE"
}
export interface TimeArrRoutes {
    [key: string]: {
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
    timeArrRoutes: TimeArrRoutes;
    timeOutArray: NodeJS.Timeout[];
    pulledDataFromTest: PulledDataFromTest;
    isTestRunningInternal: boolean;
    isTestRunningListener: (val: boolean) => void;
    isTestRunning: boolean;
    agent: http.Agent;
}
