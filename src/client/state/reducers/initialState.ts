import { HTTPMethods, AllPulledDataFromTest } from '../../interfaces';
interface InitialState {
	valueRPS: number;
	valueStart: number;
	valueEnd: number;
	valueSeconds: number;
	isTestRunning: boolean;
	curRunningRPS: number;
	inputsData: {
		method: HTTPMethods;
		targetURL: string;
		percentage: number;
		jagTesterEnabled: boolean;
	}[];
	receivedData: AllPulledDataFromTest[];
	showModal: boolean;
	modalError: string;
	resultsTabValue: number;
	curRPSpercent: number;
	curTestTotalPercent: number;
	curTestStartTime: number;
	darkMode: boolean;
	highRPSwarning: boolean;
	stoppingSpinner: boolean;
}

const initialStateString = `
{
    "valueRPS": 1000,
    "valueStart": 100,
    "valueEnd": 4100,
    "valueSeconds": 1,
    "isTestRunning": false,
    "curRunningRPS": 4100,
    "inputsData": [
        {
            "method": "GET",
            "targetURL": "http://localhost:3030",
            "percentage": 90,
            "jagTesterEnabled": false
        },
        {
            "method": "GET",
            "targetURL": "http://localhost:3030/testroute",
            "percentage": 10,
            "jagTesterEnabled": false
        }
    ],
    "receivedData": [
        {
            "testTime": 1625515059845,
            "testData": {
                "100": {
                    "/testroute": {
                        "reqId": "0",
                        "reqRoute": "/testroute",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0.02 },
                            { "fnName": "expressInit", "elapsedTime": 0 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.02 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0 },
                            { "fnName": "jsonParser", "elapsedTime": 0 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.08 },
                            { "fnName": "serveStatic", "elapsedTime": 0.22 },
                            { "fnName": "corsMiddleware", "elapsedTime": 0.04 },
                            { "fnName": "initialize", "elapsedTime": 0.06 },
                            { "fnName": "authenticate", "elapsedTime": 0.04 },
                            { "fnName": "bound dispatch", "elapsedTime": 0 },
                            { "fnName": "first", "elapsedTime": 200.7 },
                            { "fnName": "second", "elapsedTime": 100.92 },
                            { "fnName": "third", "elapsedTime": 50.88 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.46 }
                        ],
                        "receivedTime": 353.441,
                        "errorCount": 0,
                        "successfulResCount": 50
                    },
                    "/": {
                        "reqId": "0",
                        "reqRoute": "/",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0 },
                            { "fnName": "expressInit", "elapsedTime": 0 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.02 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0 },
                            { "fnName": "jsonParser", "elapsedTime": 0 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.02 },
                            { "fnName": "serveStatic", "elapsedTime": 0.98 }
                        ],
                        "receivedTime": 1.019,
                        "errorCount": 0,
                        "successfulResCount": 50
                    }
                },
                "160": {
                    "/": {
                        "reqId": "0",
                        "reqRoute": "/",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0 },
                            { "fnName": "expressInit", "elapsedTime": 0.05 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.01 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0.01 },
                            { "fnName": "jsonParser", "elapsedTime": 0.01 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.05 },
                            { "fnName": "serveStatic", "elapsedTime": 0.78 }
                        ],
                        "receivedTime": 0.906,
                        "errorCount": 0,
                        "successfulResCount": 80
                    },
                    "/testroute": {
                        "reqId": "0",
                        "reqRoute": "/testroute",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0.03 },
                            { "fnName": "expressInit", "elapsedTime": 0.03 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.03 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0.01 },
                            { "fnName": "jsonParser", "elapsedTime": 0.01 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.04 },
                            { "fnName": "serveStatic", "elapsedTime": 0.34 },
                            { "fnName": "corsMiddleware", "elapsedTime": 0.01 },
                            { "fnName": "initialize", "elapsedTime": 0.03 },
                            { "fnName": "authenticate", "elapsedTime": 0 },
                            { "fnName": "bound dispatch", "elapsedTime": 0 },
                            { "fnName": "first", "elapsedTime": 200.49 },
                            { "fnName": "second", "elapsedTime": 100.74 },
                            { "fnName": "third", "elapsedTime": 50.84 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.29 }
                        ],
                        "receivedTime": 352.889,
                        "errorCount": 0,
                        "successfulResCount": 80
                    }
                },
                "220": {
                    "/testroute": {
                        "reqId": "0",
                        "reqRoute": "/testroute",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0.02 },
                            { "fnName": "expressInit", "elapsedTime": 0.04 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.01 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0.01 },
                            { "fnName": "jsonParser", "elapsedTime": 0.01 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.05 },
                            { "fnName": "serveStatic", "elapsedTime": 0.35 },
                            { "fnName": "corsMiddleware", "elapsedTime": 0.03 },
                            { "fnName": "initialize", "elapsedTime": 0.03 },
                            { "fnName": "authenticate", "elapsedTime": 0 },
                            { "fnName": "bound dispatch", "elapsedTime": 0 },
                            { "fnName": "first", "elapsedTime": 200.53 },
                            { "fnName": "second", "elapsedTime": 100.57 },
                            { "fnName": "third", "elapsedTime": 50.75 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.28 }
                        ],
                        "receivedTime": 352.68,
                        "errorCount": 0,
                        "successfulResCount": 110
                    },
                    "/": {
                        "reqId": "0",
                        "reqRoute": "/",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0 },
                            { "fnName": "expressInit", "elapsedTime": 0.02 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.03 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0.01 },
                            { "fnName": "jsonParser", "elapsedTime": 0 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.05 },
                            { "fnName": "serveStatic", "elapsedTime": 0.87 }
                        ],
                        "receivedTime": 0.981,
                        "errorCount": 0,
                        "successfulResCount": 110
                    }
                },
                "280": {
                    "/testroute": {
                        "reqId": "0",
                        "reqRoute": "/testroute",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0.01 },
                            { "fnName": "expressInit", "elapsedTime": 0.02 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.01 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0.02 },
                            { "fnName": "jsonParser", "elapsedTime": 0 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.04 },
                            { "fnName": "serveStatic", "elapsedTime": 0.32 },
                            { "fnName": "corsMiddleware", "elapsedTime": 0.01 },
                            { "fnName": "initialize", "elapsedTime": 0.01 },
                            { "fnName": "authenticate", "elapsedTime": 0.01 },
                            { "fnName": "bound dispatch", "elapsedTime": 0 },
                            { "fnName": "first", "elapsedTime": 200.31 },
                            { "fnName": "second", "elapsedTime": 100.44 },
                            { "fnName": "third", "elapsedTime": 50.64 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.23 }
                        ],
                        "receivedTime": 352.066,
                        "errorCount": 0,
                        "successfulResCount": 140
                    },
                    "/": {
                        "reqId": "0",
                        "reqRoute": "/",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0.02 },
                            { "fnName": "expressInit", "elapsedTime": 0.03 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.01 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0.01 },
                            { "fnName": "jsonParser", "elapsedTime": 0.01 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.04 },
                            { "fnName": "serveStatic", "elapsedTime": 0.75 }
                        ],
                        "receivedTime": 0.867,
                        "errorCount": 0,
                        "successfulResCount": 140
                    }
                },
                "340": {
                    "/": {
                        "reqId": "0",
                        "reqRoute": "/",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0 },
                            { "fnName": "expressInit", "elapsedTime": 0.03 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.04 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0.02 },
                            { "fnName": "jsonParser", "elapsedTime": 0 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.03 },
                            { "fnName": "serveStatic", "elapsedTime": 0.87 }
                        ],
                        "receivedTime": 0.993,
                        "errorCount": 0,
                        "successfulResCount": 170
                    },
                    "/testroute": {
                        "reqId": "0",
                        "reqRoute": "/testroute",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0.01 },
                            { "fnName": "expressInit", "elapsedTime": 0.02 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.02 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0.02 },
                            { "fnName": "jsonParser", "elapsedTime": 0 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.06 },
                            { "fnName": "serveStatic", "elapsedTime": 0.34 },
                            { "fnName": "corsMiddleware", "elapsedTime": 0.02 },
                            { "fnName": "initialize", "elapsedTime": 0.01 },
                            { "fnName": "authenticate", "elapsedTime": 0.01 },
                            { "fnName": "bound dispatch", "elapsedTime": 0 },
                            { "fnName": "first", "elapsedTime": 200.29 },
                            { "fnName": "second", "elapsedTime": 100.41 },
                            { "fnName": "third", "elapsedTime": 50.55 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.29 }
                        ],
                        "receivedTime": 352.045,
                        "errorCount": 0,
                        "successfulResCount": 170
                    }
                },
                "400": {
                    "/": {
                        "reqId": "0",
                        "reqRoute": "/",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0.02 },
                            { "fnName": "expressInit", "elapsedTime": 0.02 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.03 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0.02 },
                            { "fnName": "jsonParser", "elapsedTime": 0 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.02 },
                            { "fnName": "serveStatic", "elapsedTime": 0.84 }
                        ],
                        "receivedTime": 0.952,
                        "errorCount": 0,
                        "successfulResCount": 200
                    },
                    "/testroute": {
                        "reqId": "0",
                        "reqRoute": "/testroute",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0.01 },
                            { "fnName": "expressInit", "elapsedTime": 0.03 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.01 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0.01 },
                            { "fnName": "jsonParser", "elapsedTime": 0 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.05 },
                            { "fnName": "serveStatic", "elapsedTime": 0.34 },
                            { "fnName": "corsMiddleware", "elapsedTime": 0.01 },
                            { "fnName": "initialize", "elapsedTime": 0.02 },
                            { "fnName": "authenticate", "elapsedTime": 0.01 },
                            { "fnName": "bound dispatch", "elapsedTime": 0 },
                            { "fnName": "first", "elapsedTime": 200.23 },
                            { "fnName": "second", "elapsedTime": 100.41 },
                            { "fnName": "third", "elapsedTime": 50.37 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.18 }
                        ],
                        "receivedTime": 351.681,
                        "errorCount": 0,
                        "successfulResCount": 200
                    }
                },
                "460": {
                    "/": {
                        "reqId": "0",
                        "reqRoute": "/",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0 },
                            { "fnName": "expressInit", "elapsedTime": 0.02 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.02 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0 },
                            { "fnName": "jsonParser", "elapsedTime": 0 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.03 },
                            { "fnName": "serveStatic", "elapsedTime": 0.54 }
                        ],
                        "receivedTime": 0.61,
                        "errorCount": 0,
                        "successfulResCount": 230
                    },
                    "/testroute": {
                        "reqId": "0",
                        "reqRoute": "/testroute",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0 },
                            { "fnName": "expressInit", "elapsedTime": 0.01 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.01 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0 },
                            { "fnName": "jsonParser", "elapsedTime": 0 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.05 },
                            { "fnName": "serveStatic", "elapsedTime": 0.25 },
                            { "fnName": "corsMiddleware", "elapsedTime": 0.01 },
                            { "fnName": "initialize", "elapsedTime": 0.01 },
                            { "fnName": "authenticate", "elapsedTime": 0 },
                            { "fnName": "bound dispatch", "elapsedTime": 0 },
                            { "fnName": "first", "elapsedTime": 200.25 },
                            { "fnName": "second", "elapsedTime": 100.3 },
                            { "fnName": "third", "elapsedTime": 50.5 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.17 }
                        ],
                        "receivedTime": 351.558,
                        "errorCount": 0,
                        "successfulResCount": 230
                    }
                },
                "520": {
                    "/testroute": {
                        "reqId": "0",
                        "reqRoute": "/testroute",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0.01 },
                            { "fnName": "expressInit", "elapsedTime": 0.01 },
                            { "fnName": "<anonymous>", "elapsedTime": 0 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0 },
                            { "fnName": "jsonParser", "elapsedTime": 0 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.02 },
                            { "fnName": "serveStatic", "elapsedTime": 0.33 },
                            { "fnName": "corsMiddleware", "elapsedTime": 0.02 },
                            { "fnName": "initialize", "elapsedTime": 0.03 },
                            { "fnName": "authenticate", "elapsedTime": 0 },
                            { "fnName": "bound dispatch", "elapsedTime": 0 },
                            { "fnName": "first", "elapsedTime": 200.23 },
                            { "fnName": "second", "elapsedTime": 100.45 },
                            { "fnName": "third", "elapsedTime": 50.53 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.2 }
                        ],
                        "receivedTime": 351.829,
                        "errorCount": 0,
                        "successfulResCount": 260
                    },
                    "/": {
                        "reqId": "0",
                        "reqRoute": "/",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0 },
                            { "fnName": "expressInit", "elapsedTime": 0.01 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.02 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0 },
                            { "fnName": "jsonParser", "elapsedTime": 0.01 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.04 },
                            { "fnName": "serveStatic", "elapsedTime": 0.88 }
                        ],
                        "receivedTime": 0.959,
                        "errorCount": 0,
                        "successfulResCount": 260
                    }
                },
                "580": {
                    "/testroute": {
                        "reqId": "0",
                        "reqRoute": "/testroute",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0 },
                            { "fnName": "expressInit", "elapsedTime": 0.02 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.01 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0.01 },
                            { "fnName": "jsonParser", "elapsedTime": 0.01 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.02 },
                            { "fnName": "serveStatic", "elapsedTime": 0.3 },
                            { "fnName": "corsMiddleware", "elapsedTime": 0.02 },
                            { "fnName": "initialize", "elapsedTime": 0.02 },
                            { "fnName": "authenticate", "elapsedTime": 0.01 },
                            { "fnName": "bound dispatch", "elapsedTime": 0 },
                            { "fnName": "first", "elapsedTime": 200.19 },
                            { "fnName": "second", "elapsedTime": 100.35 },
                            { "fnName": "third", "elapsedTime": 50.34 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.22 }
                        ],
                        "receivedTime": 351.517,
                        "errorCount": 0,
                        "successfulResCount": 290
                    },
                    "/": {
                        "reqId": "0",
                        "reqRoute": "/",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0 },
                            { "fnName": "expressInit", "elapsedTime": 0.01 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.01 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0.01 },
                            { "fnName": "jsonParser", "elapsedTime": 0.01 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.02 },
                            { "fnName": "serveStatic", "elapsedTime": 0.8 }
                        ],
                        "receivedTime": 0.858,
                        "errorCount": 0,
                        "successfulResCount": 290
                    }
                },
                "640": {
                    "/": {
                        "reqId": "0",
                        "reqRoute": "/",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0 },
                            { "fnName": "expressInit", "elapsedTime": 0.02 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.01 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0.01 },
                            { "fnName": "jsonParser", "elapsedTime": 0.01 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.02 },
                            { "fnName": "serveStatic", "elapsedTime": 0.8 }
                        ],
                        "receivedTime": 0.868,
                        "errorCount": 0,
                        "successfulResCount": 320
                    },
                    "/testroute": {
                        "reqId": "0",
                        "reqRoute": "/testroute",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0.01 },
                            { "fnName": "expressInit", "elapsedTime": 0.01 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.02 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0.01 },
                            { "fnName": "jsonParser", "elapsedTime": 0 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.01 },
                            { "fnName": "serveStatic", "elapsedTime": 0.36 },
                            { "fnName": "corsMiddleware", "elapsedTime": 0.01 },
                            { "fnName": "initialize", "elapsedTime": 0.04 },
                            { "fnName": "authenticate", "elapsedTime": 0.01 },
                            { "fnName": "bound dispatch", "elapsedTime": 0 },
                            { "fnName": "first", "elapsedTime": 200.06 },
                            { "fnName": "second", "elapsedTime": 100.33 },
                            { "fnName": "third", "elapsedTime": 50.38 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.16 }
                        ],
                        "receivedTime": 351.407,
                        "errorCount": 0,
                        "successfulResCount": 320
                    }
                },
                "700": {
                    "/testroute": {
                        "reqId": "0",
                        "reqRoute": "/testroute",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0.01 },
                            { "fnName": "expressInit", "elapsedTime": 0.02 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.02 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0 },
                            { "fnName": "jsonParser", "elapsedTime": 0 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.03 },
                            { "fnName": "serveStatic", "elapsedTime": 0.31 },
                            { "fnName": "corsMiddleware", "elapsedTime": 0.02 },
                            { "fnName": "initialize", "elapsedTime": 0.01 },
                            { "fnName": "authenticate", "elapsedTime": 0.01 },
                            { "fnName": "bound dispatch", "elapsedTime": 0 },
                            { "fnName": "first", "elapsedTime": 200.17 },
                            { "fnName": "second", "elapsedTime": 100.45 },
                            { "fnName": "third", "elapsedTime": 50.45 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.13 }
                        ],
                        "receivedTime": 351.627,
                        "errorCount": 0,
                        "successfulResCount": 350
                    },
                    "/": {
                        "reqId": "0",
                        "reqRoute": "/",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0 },
                            { "fnName": "expressInit", "elapsedTime": 0.01 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.01 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0.01 },
                            { "fnName": "jsonParser", "elapsedTime": 0.01 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.02 },
                            { "fnName": "serveStatic", "elapsedTime": 0.8 }
                        ],
                        "receivedTime": 0.858,
                        "errorCount": 0,
                        "successfulResCount": 350
                    }
                },
                "760": {
                    "/testroute": {
                        "reqId": "0",
                        "reqRoute": "/testroute",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0.01 },
                            { "fnName": "expressInit", "elapsedTime": 0.01 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.01 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0.01 },
                            { "fnName": "jsonParser", "elapsedTime": 0 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.02 },
                            { "fnName": "serveStatic", "elapsedTime": 0.34 },
                            { "fnName": "corsMiddleware", "elapsedTime": 0.02 },
                            { "fnName": "initialize", "elapsedTime": 0.03 },
                            { "fnName": "authenticate", "elapsedTime": 0.01 },
                            { "fnName": "bound dispatch", "elapsedTime": 0 },
                            { "fnName": "first", "elapsedTime": 200.13 },
                            { "fnName": "second", "elapsedTime": 100.35 },
                            { "fnName": "third", "elapsedTime": 50.35 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.14 }
                        ],
                        "receivedTime": 351.434,
                        "errorCount": 0,
                        "successfulResCount": 380
                    },
                    "/": {
                        "reqId": "0",
                        "reqRoute": "/",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0 },
                            { "fnName": "expressInit", "elapsedTime": 0.01 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.01 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0.01 },
                            { "fnName": "jsonParser", "elapsedTime": 0.01 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.05 },
                            { "fnName": "serveStatic", "elapsedTime": 0.76 }
                        ],
                        "receivedTime": 0.847,
                        "errorCount": 0,
                        "successfulResCount": 380
                    }
                },
                "820": {
                    "/": {
                        "reqId": "0",
                        "reqRoute": "/",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0 },
                            { "fnName": "expressInit", "elapsedTime": 0.01 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.02 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0.01 },
                            { "fnName": "jsonParser", "elapsedTime": 0 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.02 },
                            { "fnName": "serveStatic", "elapsedTime": 0.8 }
                        ],
                        "receivedTime": 0.855,
                        "errorCount": 0,
                        "successfulResCount": 410
                    },
                    "/testroute": {
                        "reqId": "0",
                        "reqRoute": "/testroute",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0 },
                            { "fnName": "expressInit", "elapsedTime": 0 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.01 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0 },
                            { "fnName": "jsonParser", "elapsedTime": 0.01 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.02 },
                            { "fnName": "serveStatic", "elapsedTime": 0.3 },
                            { "fnName": "corsMiddleware", "elapsedTime": 0.02 },
                            { "fnName": "initialize", "elapsedTime": 0.01 },
                            { "fnName": "authenticate", "elapsedTime": 0.01 },
                            { "fnName": "bound dispatch", "elapsedTime": 0 },
                            { "fnName": "first", "elapsedTime": 200.2 },
                            { "fnName": "second", "elapsedTime": 100.33 },
                            { "fnName": "third", "elapsedTime": 50.38 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.09 }
                        ],
                        "receivedTime": 351.381,
                        "errorCount": 0,
                        "successfulResCount": 410
                    }
                },
                "880": {
                    "/": {
                        "reqId": "0",
                        "reqRoute": "/",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0 },
                            { "fnName": "expressInit", "elapsedTime": 0.02 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.01 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0.01 },
                            { "fnName": "jsonParser", "elapsedTime": 0 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.04 },
                            { "fnName": "serveStatic", "elapsedTime": 0.74 }
                        ],
                        "receivedTime": 0.82,
                        "errorCount": 0,
                        "successfulResCount": 440
                    },
                    "/testroute": {
                        "reqId": "0",
                        "reqRoute": "/testroute",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0 },
                            { "fnName": "expressInit", "elapsedTime": 0.01 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.01 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0.01 },
                            { "fnName": "jsonParser", "elapsedTime": 0 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.02 },
                            { "fnName": "serveStatic", "elapsedTime": 0.29 },
                            { "fnName": "corsMiddleware", "elapsedTime": 0.02 },
                            { "fnName": "initialize", "elapsedTime": 0.02 },
                            { "fnName": "authenticate", "elapsedTime": 0.01 },
                            { "fnName": "bound dispatch", "elapsedTime": 0 },
                            { "fnName": "first", "elapsedTime": 200.19 },
                            { "fnName": "second", "elapsedTime": 100.27 },
                            { "fnName": "third", "elapsedTime": 50.37 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.11 }
                        ],
                        "receivedTime": 351.327,
                        "errorCount": 0,
                        "successfulResCount": 440
                    }
                },
                "940": {
                    "/": {
                        "reqId": "0",
                        "reqRoute": "/",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0 },
                            { "fnName": "expressInit", "elapsedTime": 0.01 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.01 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0.01 },
                            { "fnName": "jsonParser", "elapsedTime": 0 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.02 },
                            { "fnName": "serveStatic", "elapsedTime": 0.78 }
                        ],
                        "receivedTime": 0.827,
                        "errorCount": 0,
                        "successfulResCount": 470
                    },
                    "/testroute": {
                        "reqId": "0",
                        "reqRoute": "/testroute",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0 },
                            { "fnName": "expressInit", "elapsedTime": 0.01 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.01 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0.01 },
                            { "fnName": "jsonParser", "elapsedTime": 0 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.02 },
                            { "fnName": "serveStatic", "elapsedTime": 0.26 },
                            { "fnName": "corsMiddleware", "elapsedTime": 0.01 },
                            { "fnName": "initialize", "elapsedTime": 0.01 },
                            { "fnName": "authenticate", "elapsedTime": 0 },
                            { "fnName": "bound dispatch", "elapsedTime": 0 },
                            { "fnName": "first", "elapsedTime": 200.23 },
                            { "fnName": "second", "elapsedTime": 100.36 },
                            { "fnName": "third", "elapsedTime": 50.35 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.08 }
                        ],
                        "receivedTime": 351.349,
                        "errorCount": 0,
                        "successfulResCount": 470
                    }
                },
                "1000": {
                    "/": {
                        "reqId": "0",
                        "reqRoute": "/",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0 },
                            { "fnName": "expressInit", "elapsedTime": 0.01 },
                            { "fnName": "<anonymous>", "elapsedTime": 0 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0.01 },
                            { "fnName": "jsonParser", "elapsedTime": 0 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.01 },
                            { "fnName": "serveStatic", "elapsedTime": 0.7 }
                        ],
                        "receivedTime": 0.732,
                        "errorCount": 0,
                        "successfulResCount": 500
                    },
                    "/testroute": {
                        "reqId": "0",
                        "reqRoute": "/testroute",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0 },
                            { "fnName": "expressInit", "elapsedTime": 0.01 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.01 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0 },
                            { "fnName": "jsonParser", "elapsedTime": 0 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.02 },
                            { "fnName": "serveStatic", "elapsedTime": 0.27 },
                            { "fnName": "corsMiddleware", "elapsedTime": 0.02 },
                            { "fnName": "initialize", "elapsedTime": 0.01 },
                            { "fnName": "authenticate", "elapsedTime": 0 },
                            { "fnName": "bound dispatch", "elapsedTime": 0 },
                            { "fnName": "first", "elapsedTime": 200.24 },
                            { "fnName": "second", "elapsedTime": 100.3 },
                            { "fnName": "third", "elapsedTime": 50.36 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.02 }
                        ],
                        "receivedTime": 351.26,
                        "errorCount": 0,
                        "successfulResCount": 500
                    }
                }
            }
        },
        {
            "testTime": 1625515140914,
            "testData": {
                "100": {
                    "/": {
                        "reqId": "0",
                        "reqRoute": "/",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0.01 },
                            { "fnName": "expressInit", "elapsedTime": 0.04 },
                            { "fnName": "<anonymous>", "elapsedTime": 0 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0 },
                            { "fnName": "jsonParser", "elapsedTime": 0.01 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.04 },
                            { "fnName": "serveStatic", "elapsedTime": 0.89 }
                        ],
                        "receivedTime": 0.988,
                        "errorCount": 0,
                        "successfulResCount": 100
                    },
                    "/testroute": {
                        "reqId": "0",
                        "reqRoute": "/testroute",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0 },
                            { "fnName": "expressInit", "elapsedTime": 0 },
                            { "fnName": "<anonymous>", "elapsedTime": 0 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0.01 },
                            { "fnName": "jsonParser", "elapsedTime": 0.01 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.08 },
                            { "fnName": "serveStatic", "elapsedTime": 0.43 },
                            { "fnName": "corsMiddleware", "elapsedTime": 0.03 },
                            { "fnName": "initialize", "elapsedTime": 0.02 },
                            { "fnName": "authenticate", "elapsedTime": 0.02 },
                            { "fnName": "bound dispatch", "elapsedTime": 0 },
                            { "fnName": "first", "elapsedTime": 200.8 },
                            { "fnName": "second", "elapsedTime": 100.93 },
                            { "fnName": "third", "elapsedTime": 50.71 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.34 }
                        ],
                        "receivedTime": 353.384,
                        "errorCount": 0,
                        "successfulResCount": 100
                    }
                },
                "1100": {
                    "/": {
                        "reqId": "0",
                        "reqRoute": "/",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0 },
                            { "fnName": "expressInit", "elapsedTime": 0.01 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.01 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0.01 },
                            { "fnName": "jsonParser", "elapsedTime": 0 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.02 },
                            { "fnName": "serveStatic", "elapsedTime": 0.95 }
                        ],
                        "receivedTime": 1.001,
                        "errorCount": 0,
                        "successfulResCount": 1100
                    },
                    "/testroute": {
                        "reqId": "0",
                        "reqRoute": "/testroute",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0 },
                            { "fnName": "expressInit", "elapsedTime": 0.01 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.01 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0.01 },
                            { "fnName": "jsonParser", "elapsedTime": 0 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.02 },
                            { "fnName": "serveStatic", "elapsedTime": 0.34 },
                            { "fnName": "corsMiddleware", "elapsedTime": 0.01 },
                            { "fnName": "initialize", "elapsedTime": 0.01 },
                            { "fnName": "authenticate", "elapsedTime": 0.01 },
                            { "fnName": "bound dispatch", "elapsedTime": 0 },
                            { "fnName": "first", "elapsedTime": 199.93 },
                            { "fnName": "second", "elapsedTime": 100.28 },
                            { "fnName": "third", "elapsedTime": 50.38 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.22 }
                        ],
                        "receivedTime": 351.228,
                        "errorCount": 0,
                        "successfulResCount": 1100
                    }
                },
                "2100": {
                    "/": {
                        "reqId": "0",
                        "reqRoute": "/",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0 },
                            { "fnName": "expressInit", "elapsedTime": 0 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.01 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0 },
                            { "fnName": "jsonParser", "elapsedTime": 0 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.02 },
                            { "fnName": "serveStatic", "elapsedTime": 1.24 }
                        ],
                        "receivedTime": 1.275,
                        "errorCount": 0,
                        "successfulResCount": 2100
                    },
                    "/testroute": {
                        "reqId": "0",
                        "reqRoute": "/testroute",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0 },
                            { "fnName": "expressInit", "elapsedTime": 0.01 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.01 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0 },
                            { "fnName": "jsonParser", "elapsedTime": 0 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.02 },
                            { "fnName": "serveStatic", "elapsedTime": 0.42 },
                            { "fnName": "corsMiddleware", "elapsedTime": 0.01 },
                            { "fnName": "initialize", "elapsedTime": 0.01 },
                            { "fnName": "authenticate", "elapsedTime": 0 },
                            { "fnName": "bound dispatch", "elapsedTime": 0 },
                            { "fnName": "first", "elapsedTime": 200.06 },
                            { "fnName": "second", "elapsedTime": 100.34 },
                            { "fnName": "third", "elapsedTime": 50.44 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.19 }
                        ],
                        "receivedTime": 351.51,
                        "errorCount": 0,
                        "successfulResCount": 2100
                    }
                },
                "3100": {
                    "/": {
                        "reqId": "0",
                        "reqRoute": "/",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0 },
                            { "fnName": "expressInit", "elapsedTime": 0.01 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.01 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0 },
                            { "fnName": "jsonParser", "elapsedTime": 0 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.02 },
                            { "fnName": "serveStatic", "elapsedTime": 2.17 }
                        ],
                        "receivedTime": 2.21,
                        "errorCount": 0,
                        "successfulResCount": 3100
                    },
                    "/testroute": {
                        "reqId": "0",
                        "reqRoute": "/testroute",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0 },
                            { "fnName": "expressInit", "elapsedTime": 0.01 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.01 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0 },
                            { "fnName": "jsonParser", "elapsedTime": 0 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.01 },
                            { "fnName": "serveStatic", "elapsedTime": 0.64 },
                            { "fnName": "corsMiddleware", "elapsedTime": 0.01 },
                            { "fnName": "initialize", "elapsedTime": 0.01 },
                            { "fnName": "authenticate", "elapsedTime": 0 },
                            { "fnName": "bound dispatch", "elapsedTime": 0 },
                            { "fnName": "first", "elapsedTime": 200.22 },
                            { "fnName": "second", "elapsedTime": 100.41 },
                            { "fnName": "third", "elapsedTime": 50.53 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.12 }
                        ],
                        "receivedTime": 351.972,
                        "errorCount": 0,
                        "successfulResCount": 3100
                    }
                },
                "4100": {
                    "/": {
                        "reqId": "0",
                        "reqRoute": "/",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0 },
                            { "fnName": "expressInit", "elapsedTime": 0.01 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.01 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0 },
                            { "fnName": "jsonParser", "elapsedTime": 0 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.01 },
                            { "fnName": "serveStatic", "elapsedTime": 37.38 }
                        ],
                        "receivedTime": 37.414,
                        "errorCount": 0,
                        "successfulResCount": 4100
                    },
                    "/testroute": {
                        "reqId": "0",
                        "reqRoute": "/testroute",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0 },
                            { "fnName": "expressInit", "elapsedTime": 0 },
                            { "fnName": "<anonymous>", "elapsedTime": 0 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0 },
                            { "fnName": "jsonParser", "elapsedTime": 0 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.01 },
                            { "fnName": "serveStatic", "elapsedTime": 10.25 },
                            { "fnName": "corsMiddleware", "elapsedTime": 0 },
                            { "fnName": "initialize", "elapsedTime": 0.01 },
                            { "fnName": "authenticate", "elapsedTime": 0 },
                            { "fnName": "bound dispatch", "elapsedTime": 0 },
                            { "fnName": "first", "elapsedTime": 208.04 },
                            { "fnName": "second", "elapsedTime": 108.91 },
                            { "fnName": "third", "elapsedTime": 58.43 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.1 }
                        ],
                        "receivedTime": 385.746,
                        "errorCount": 0,
                        "successfulResCount": 4100
                    }
                },
                "5100": {
                    "/": {
                        "reqId": "0",
                        "reqRoute": "/",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0 },
                            { "fnName": "expressInit", "elapsedTime": 0.01 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.01 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0 },
                            { "fnName": "jsonParser", "elapsedTime": 0 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.01 },
                            { "fnName": "serveStatic", "elapsedTime": 150.1 }
                        ],
                        "receivedTime": 150.133,
                        "errorCount": 485,
                        "successfulResCount": 4615
                    },
                    "/testroute": {
                        "reqId": "0",
                        "reqRoute": "/testroute",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0 },
                            { "fnName": "expressInit", "elapsedTime": 0 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.01 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0 },
                            { "fnName": "jsonParser", "elapsedTime": 0 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.02 },
                            { "fnName": "serveStatic", "elapsedTime": 42.13 },
                            { "fnName": "corsMiddleware", "elapsedTime": 0.01 },
                            { "fnName": "initialize", "elapsedTime": 0.01 },
                            { "fnName": "authenticate", "elapsedTime": 0 },
                            { "fnName": "bound dispatch", "elapsedTime": 0 },
                            { "fnName": "first", "elapsedTime": 232.6 },
                            { "fnName": "second", "elapsedTime": 136.83 },
                            { "fnName": "third", "elapsedTime": 85.82 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.09 }
                        ],
                        "receivedTime": 497.519,
                        "errorCount": 498,
                        "successfulResCount": 4602
                    }
                },
                "6100": {
                    "/": {
                        "reqId": "0",
                        "reqRoute": "/",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0 },
                            { "fnName": "expressInit", "elapsedTime": 0.01 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.01 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0 },
                            { "fnName": "jsonParser", "elapsedTime": 0 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.01 },
                            { "fnName": "serveStatic", "elapsedTime": 178.36 }
                        ],
                        "receivedTime": 178.389,
                        "errorCount": 814,
                        "successfulResCount": 5286
                    },
                    "/testroute": {
                        "reqId": "0",
                        "reqRoute": "/testroute",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0 },
                            { "fnName": "expressInit", "elapsedTime": 0 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.01 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0 },
                            { "fnName": "jsonParser", "elapsedTime": 0 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.01 },
                            { "fnName": "serveStatic", "elapsedTime": 60.33 },
                            { "fnName": "corsMiddleware", "elapsedTime": 0.01 },
                            { "fnName": "initialize", "elapsedTime": 0.01 },
                            { "fnName": "authenticate", "elapsedTime": 0 },
                            { "fnName": "bound dispatch", "elapsedTime": 0 },
                            { "fnName": "first", "elapsedTime": 281.83 },
                            { "fnName": "second", "elapsedTime": 151.66 },
                            { "fnName": "third", "elapsedTime": 102.3 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.09 }
                        ],
                        "receivedTime": 596.245,
                        "errorCount": 815,
                        "successfulResCount": 5285
                    }
                }
            }
        },
        {
            "testTime": 1625515215757,
            "testData": {
                "100": {
                    "/": {
                        "reqId": "0",
                        "reqRoute": "/",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0.01 },
                            { "fnName": "expressInit", "elapsedTime": 0.06 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.01 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0.02 },
                            { "fnName": "jsonParser", "elapsedTime": 0 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.07 },
                            { "fnName": "serveStatic", "elapsedTime": 0.62 }
                        ],
                        "receivedTime": 0.785,
                        "errorCount": 0,
                        "successfulResCount": 90
                    },
                    "/testroute": {
                        "reqId": "0",
                        "reqRoute": "/testroute",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0 },
                            { "fnName": "expressInit", "elapsedTime": 0 },
                            { "fnName": "<anonymous>", "elapsedTime": 0 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0 },
                            { "fnName": "jsonParser", "elapsedTime": 0 },
                            { "fnName": "_cookieSession", "elapsedTime": 0 },
                            { "fnName": "serveStatic", "elapsedTime": 0.5 },
                            { "fnName": "corsMiddleware", "elapsedTime": 0 },
                            { "fnName": "initialize", "elapsedTime": 0 },
                            { "fnName": "authenticate", "elapsedTime": 0 },
                            { "fnName": "bound dispatch", "elapsedTime": 0 },
                            { "fnName": "first", "elapsedTime": 201.5 },
                            { "fnName": "second", "elapsedTime": 100.9 },
                            { "fnName": "third", "elapsedTime": 51 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.72 }
                        ],
                        "receivedTime": 354.624,
                        "errorCount": 0,
                        "successfulResCount": 10
                    }
                },
                "1100": {
                    "/": {
                        "reqId": "0",
                        "reqRoute": "/",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0 },
                            { "fnName": "expressInit", "elapsedTime": 0.02 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.01 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0.01 },
                            { "fnName": "jsonParser", "elapsedTime": 0 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.03 },
                            { "fnName": "serveStatic", "elapsedTime": 0.92 }
                        ],
                        "receivedTime": 0.993,
                        "errorCount": 0,
                        "successfulResCount": 990
                    },
                    "/testroute": {
                        "reqId": "0",
                        "reqRoute": "/testroute",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0.01 },
                            { "fnName": "expressInit", "elapsedTime": 0.01 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.02 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0 },
                            { "fnName": "jsonParser", "elapsedTime": 0 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.05 },
                            { "fnName": "serveStatic", "elapsedTime": 0.32 },
                            { "fnName": "corsMiddleware", "elapsedTime": 0.01 },
                            { "fnName": "initialize", "elapsedTime": 0.03 },
                            { "fnName": "authenticate", "elapsedTime": 0.01 },
                            { "fnName": "bound dispatch", "elapsedTime": 0 },
                            { "fnName": "first", "elapsedTime": 199.95 },
                            { "fnName": "second", "elapsedTime": 100.37 },
                            { "fnName": "third", "elapsedTime": 50.32 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.26 }
                        ],
                        "receivedTime": 351.358,
                        "errorCount": 0,
                        "successfulResCount": 110
                    }
                },
                "2100": {
                    "/": {
                        "reqId": "0",
                        "reqRoute": "/",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0 },
                            { "fnName": "expressInit", "elapsedTime": 0.01 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.01 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0.01 },
                            { "fnName": "jsonParser", "elapsedTime": 0 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.02 },
                            { "fnName": "serveStatic", "elapsedTime": 1.68 }
                        ],
                        "receivedTime": 1.734,
                        "errorCount": 0,
                        "successfulResCount": 1890
                    },
                    "/testroute": {
                        "reqId": "0",
                        "reqRoute": "/testroute",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0 },
                            { "fnName": "expressInit", "elapsedTime": 0.01 },
                            { "fnName": "<anonymous>", "elapsedTime": 0 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0 },
                            { "fnName": "jsonParser", "elapsedTime": 0 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.04 },
                            { "fnName": "serveStatic", "elapsedTime": 0.4 },
                            { "fnName": "corsMiddleware", "elapsedTime": 0 },
                            { "fnName": "initialize", "elapsedTime": 0 },
                            { "fnName": "authenticate", "elapsedTime": 0.01 },
                            { "fnName": "bound dispatch", "elapsedTime": 0 },
                            { "fnName": "first", "elapsedTime": 200.06 },
                            { "fnName": "second", "elapsedTime": 100.31 },
                            { "fnName": "third", "elapsedTime": 50.49 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.27 }
                        ],
                        "receivedTime": 351.587,
                        "errorCount": 0,
                        "successfulResCount": 210
                    }
                },
                "3100": {
                    "/": {
                        "reqId": "0",
                        "reqRoute": "/",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0 },
                            { "fnName": "expressInit", "elapsedTime": 0.01 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.01 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0 },
                            { "fnName": "jsonParser", "elapsedTime": 0 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.01 },
                            { "fnName": "serveStatic", "elapsedTime": 1.26 }
                        ],
                        "receivedTime": 1.289,
                        "errorCount": 0,
                        "successfulResCount": 2790
                    },
                    "/testroute": {
                        "reqId": "0",
                        "reqRoute": "/testroute",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0 },
                            { "fnName": "expressInit", "elapsedTime": 0 },
                            { "fnName": "<anonymous>", "elapsedTime": 0 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0 },
                            { "fnName": "jsonParser", "elapsedTime": 0.01 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.02 },
                            { "fnName": "serveStatic", "elapsedTime": 0.41 },
                            { "fnName": "corsMiddleware", "elapsedTime": 0.01 },
                            { "fnName": "initialize", "elapsedTime": 0.01 },
                            { "fnName": "authenticate", "elapsedTime": 0.01 },
                            { "fnName": "bound dispatch", "elapsedTime": 0 },
                            { "fnName": "first", "elapsedTime": 199.95 },
                            { "fnName": "second", "elapsedTime": 100.19 },
                            { "fnName": "third", "elapsedTime": 50.34 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.22 }
                        ],
                        "receivedTime": 351.173,
                        "errorCount": 0,
                        "successfulResCount": 310
                    }
                },
                "4100": {
                    "/": {
                        "reqId": "0",
                        "reqRoute": "/",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0 },
                            { "fnName": "expressInit", "elapsedTime": 0 },
                            { "fnName": "<anonymous>", "elapsedTime": 0 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0 },
                            { "fnName": "jsonParser", "elapsedTime": 0 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.02 },
                            { "fnName": "serveStatic", "elapsedTime": 5.47 }
                        ],
                        "receivedTime": 5.489,
                        "errorCount": 0,
                        "successfulResCount": 3690
                    },
                    "/testroute": {
                        "reqId": "0",
                        "reqRoute": "/testroute",
                        "middlewares": [
                            { "fnName": "query", "elapsedTime": 0 },
                            { "fnName": "expressInit", "elapsedTime": 0.01 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.01 },
                            { "fnName": "urlencodedParser", "elapsedTime": 0 },
                            { "fnName": "jsonParser", "elapsedTime": 0 },
                            { "fnName": "_cookieSession", "elapsedTime": 0.02 },
                            { "fnName": "serveStatic", "elapsedTime": 1.66 },
                            { "fnName": "corsMiddleware", "elapsedTime": 0.01 },
                            { "fnName": "initialize", "elapsedTime": 0.01 },
                            { "fnName": "authenticate", "elapsedTime": 0 },
                            { "fnName": "bound dispatch", "elapsedTime": 0 },
                            { "fnName": "first", "elapsedTime": 200.8 },
                            { "fnName": "second", "elapsedTime": 100.78 },
                            { "fnName": "third", "elapsedTime": 51.01 },
                            { "fnName": "<anonymous>", "elapsedTime": 0.15 }
                        ],
                        "receivedTime": 354.463,
                        "errorCount": 0,
                        "successfulResCount": 410
                    }
                }
            }
        }
    ],
    "showModal": false,
    "modalError": "FetchError: request to http://localhost:3030/ failed, reason: connect ECONNREFUSED 127.0.0.1:3030",
    "resultsTabValue": 1,
    "curRPSpercent": 0,
    "curTestTotalPercent": 100,
    "curTestStartTime": 1625515208868,
    "darkMode": false,
    "highRPSwarning": false,
    "stoppingSpinner": false
}
`;
const initialState: InitialState =
	process.env.JAG === 'demo'
		? JSON.parse(initialStateString)
		: {
				valueRPS: 500,
				valueStart: 100,
				valueEnd: 600,
				valueSeconds: 1,
				isTestRunning: false,
				curRunningRPS: 0,
				inputsData: [
					{
						method: HTTPMethods.GET,
						targetURL: 'http://localhost:',
						percentage: 100,
						jagTesterEnabled: false,
					},
				],
				receivedData: [],
				showModal: false,
				modalError: '',
				resultsTabValue: 0,
				curRPSpercent: 0,
				curTestTotalPercent: 0,
				curTestStartTime: 0,
				darkMode: false,
				highRPSwarning: false,
				stoppingSpinner: false,
		  };

export { initialState };
