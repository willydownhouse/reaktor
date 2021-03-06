"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const maxSize = 1024 * 100;
exports.upload = (0, multer_1.default)({
    dest: './uploads',
    limits: {
        fileSize: maxSize,
    },
    fileFilter: function (_req, file, cb) {
        console.log('FROM MULTER FILE FILTER:');
        console.log(file);
        if (file.mimetype === 'application/octet-stream' ||
            file.mimetype === 'application/toml') {
            return cb(null, true);
        }
        cb(null, false);
    },
});
