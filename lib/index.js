"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var response_time_1 = __importDefault(require("response-time"));
var getMiddleware = function (app) {
    var collectedData = {};
    var routeData = {};
    var isPrototypeChanged = false;
    var Jagtestercommands;
    (function (Jagtestercommands) {
        Jagtestercommands[Jagtestercommands["updateLayer"] = 0] = "updateLayer";
        Jagtestercommands[Jagtestercommands["running"] = 1] = "running";
        Jagtestercommands[Jagtestercommands["endTest"] = 2] = "endTest";
    })(Jagtestercommands || (Jagtestercommands = {}));
    var resetLayerPrototype = function () {
        app._router.stack[0].__proto__.handle_request = originalLayerHandleRequest;
        isPrototypeChanged = false;
        collectedData = {};
        routeData = {};
    };
    var updateLayerPrototype = function () {
        app._router.stack[0].__proto__.handle_request = newLayerHandleRequest;
        isPrototypeChanged = true;
        collectedData = {};
        routeData = {};
    };
    var originalLayerHandleRequest = function handle(req, res, next) {
        var fn = this.handle;
        if (fn.length > 3) {
            // not a standard request handler
            return next();
        }
        try {
            fn(req, res, next);
        }
        catch (err) {
            next(err);
        }
    };
    var newLayerHandleRequest = function handle(req, res, next) {
        var fn = this.handle;
        if (fn.length > 3) {
            // not a standard request handler
            return next();
        }
        try {
            var fnName = this.name, reqId_1 = req.headers.jagtesterreqid ? req.headers.jagtesterreqid.toString() : undefined, reqRoute_1 = req.url;
            // create a data object in the collected data if it doesnt already exist
            if (!routeData[reqRoute_1]) {
                var newCollectedData = {};
                newCollectedData[reqId_1] = {
                    reqId: reqId_1,
                    reqRoute: reqRoute_1,
                    middlewares: [],
                };
                routeData[reqRoute_1] = newCollectedData;
            }
            else {
                // create a data object in the collected data if it doesnt already exist
                if (reqId_1 && !routeData[reqRoute_1][reqId_1]) {
                    routeData[reqRoute_1][reqId_1] = {
                        reqId: reqId_1,
                        reqRoute: reqRoute_1,
                        middlewares: [],
                    };
                }
            }
            // create a data object in the collected data if it doesnt already exist
            if (reqId_1 && !collectedData[reqId_1]) {
                collectedData[reqId_1] = {
                    reqId: reqId_1,
                    reqRoute: reqRoute_1,
                    middlewares: [],
                };
            }
            if (reqId_1) {
                // add layer information to the collectedData
                routeData[reqRoute_1][reqId_1].middlewares.push({
                    fnName: fnName,
                    elapsedTime: 0,
                });
                collectedData[reqId_1].middlewares.push({
                    fnName: fnName,
                    elapsedTime: 0,
                });
            }
            // call the middleware and time it in the next function
            var beforeFunctionCall_1 = Date.now();
            fn(req, res, function () {
                if (reqId_1 && routeData[reqRoute_1][reqId_1]) {
                    var lastElIndex = routeData[reqRoute_1][reqId_1].middlewares.length - 1;
                    routeData[reqRoute_1][reqId_1].middlewares[lastElIndex].elapsedTime = Date.now() - beforeFunctionCall_1;
                }
                next();
            });
        }
        catch (err) {
            next(err);
        }
    };
    // this is the actual middleware that will take jagtestercommands
    return function (req, res, next) {
        // getting the command
        var jagtestercommand = +req.headers.jagtestercommand;
        switch (jagtestercommand) {
            //changing the prototype of the layer handle request while running
            case Jagtestercommands.running:
                if (!isPrototypeChanged) {
                    updateLayerPrototype();
                }
                // res.header({ jagtesterRoute: req.url });
                break;
            //changing the prototype of the layer handle request
            case Jagtestercommands.updateLayer:
                updateLayerPrototype();
                // res.header({ jagtesterRoute: req.url });
                return res.json({ jagtester: true });
            //reset the prototype and send back json data
            case Jagtestercommands.endTest:
                res.json(routeData);
                resetLayerPrototype();
                return;
            default:
                // changing layer prototype back to original
                if (isPrototypeChanged) {
                    resetLayerPrototype();
                }
                break;
        }
        return response_time_1.default({ suffix: false })(req, res, next);
    };
};
module.exports = getMiddleware;
