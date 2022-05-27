"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const fileRouter_1 = __importDefault(require("./router/fileRouter"));
const errorController_1 = require("./controllers/errorController");
const appError_1 = __importDefault(require("./utils/appError"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 30,
    standardHeaders: true,
});
app.use(limiter);
app.use((0, cors_1.default)());
app.use('/api/upload', fileRouter_1.default);
app.get('/health', (_req, res) => {
    res.send('ok');
});
app.all('*', (_req, _res, next) => {
    next(new appError_1.default('unknown endpoint', 404));
});
app.use(errorController_1.errorHandler);
exports.default = app;
