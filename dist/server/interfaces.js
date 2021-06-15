"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPMethods = exports.ioSocketCommands = exports.Jagtestercommands = void 0;
var Jagtestercommands;
(function (Jagtestercommands) {
    Jagtestercommands[Jagtestercommands["updateLayer"] = 0] = "updateLayer";
    Jagtestercommands[Jagtestercommands["running"] = 1] = "running";
    Jagtestercommands[Jagtestercommands["endTest"] = 2] = "endTest";
})(Jagtestercommands = exports.Jagtestercommands || (exports.Jagtestercommands = {}));
var ioSocketCommands;
(function (ioSocketCommands) {
    ioSocketCommands["testRunningStateChange"] = "testRunningStateChange";
    ioSocketCommands["singleRPSfinished"] = "singleRPSfinished";
    ioSocketCommands["allRPSfinished"] = "allRPSfinished";
    ioSocketCommands["errorInfo"] = "errorInfo";
    ioSocketCommands["currentRPSProgress"] = "currentRPSProgress";
})(ioSocketCommands = exports.ioSocketCommands || (exports.ioSocketCommands = {}));
var HTTPMethods;
(function (HTTPMethods) {
    HTTPMethods["GET"] = "GET";
    HTTPMethods["POST"] = "POST";
    HTTPMethods["PUT"] = "PUT";
    HTTPMethods["DELETE"] = "DELETE";
    HTTPMethods["PATCH"] = "PATCH";
    HTTPMethods["HEAD"] = "HEAD";
    HTTPMethods["CONNECT"] = "CONNECT";
    HTTPMethods["TRACE"] = "TRACE";
})(HTTPMethods = exports.HTTPMethods || (exports.HTTPMethods = {}));
