"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const testrouter_1 = __importDefault(require("./testrouter"));
const app = express_1.default();
exports.app = app;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/', express_1.default.static(path_1.default.join(__dirname, '../client')));
app.use('/api', testrouter_1.default);
app.get(['/', '/results'], (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../client/index.html'));
});
app.use('/*', (req, res) => {
    res.redirect('/');
});
