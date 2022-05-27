"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const appError_1 = __importDefault(require("../utils/appError"));
const errorHandler = (err, _req, res, _next) => {
    console.log('FROM ERROR CONTROLLER:');
    console.log(err);
    const statusCode = err instanceof appError_1.default ? err.statusCode : 500;
    if (err.name === 'MulterError') {
        return res.status(+err.code).json({
            message: err.message,
        });
    }
    return res.status(statusCode).json({
        message: err.message,
    });
};
exports.errorHandler = errorHandler;
