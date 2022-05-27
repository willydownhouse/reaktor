"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseFile_1 = require("../utils/parseFile");
const appError_1 = __importDefault(require("../utils/appError"));
const uploadTomlFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.file);
        if (!req.file) {
            throw new appError_1.default('Please insert a toml file', 400);
        }
        const data = yield (0, parseFile_1.parseFileToArrayOfObjects)(req.file.path);
        res.status(200).json({
            docs: data.length,
            data,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.default = {
    uploadTomlFile,
};
