"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseFileToArrayOfObjects = void 0;
const fs = __importStar(require("fs/promises"));
const parseUtils_1 = require("./parseUtils");
const parseFileToArrayOfObjects = (path) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fs.readFile(path, { encoding: 'utf-8' });
    const fileAsAnArrayOfStrings = data
        .replaceAll(',', ' ')
        .replaceAll('[[package]]', 'package')
        .replaceAll('[package.dependencies]', 'dependencies')
        .replaceAll('[package.extras]', 'extras')
        .replace(/(\r\n|\n|\r)/gm, `,`)
        .replace(/=/g, `:`)
        .split(',')
        .filter(item => item !== `` && item !== `"`);
    // get package string indexes
    const arrOfIndexes = (0, parseUtils_1.getPackageStringIndexes)(fileAsAnArrayOfStrings, 'package');
    // get index of [metadata] string
    const metaIndex = fileAsAnArrayOfStrings.indexOf('[metadata]');
    // make each package as an array (in Array)
    const arrayOfPackageArrays = arrOfIndexes.map((index, i) => {
        // if file does not have metadata
        if (metaIndex === -1) {
            return fileAsAnArrayOfStrings.slice(index, arrOfIndexes[i + 1]);
        }
        // if file has metadata then remove it
        const fileAsAnArrayOfStringsWithoutMeta = fileAsAnArrayOfStrings.slice(0, metaIndex);
        return fileAsAnArrayOfStringsWithoutMeta.slice(index, arrOfIndexes[i + 1]);
    });
    const arrayOfPackageObjects = arrayOfPackageArrays.map(arr => {
        const ob = {};
        arr.forEach((item, i) => {
            if (item === 'package') {
                ob[item] = (0, parseUtils_1.buildPackageObject)(arr);
            }
            if (item === 'dependencies') {
                ob[item] = (0, parseUtils_1.buildDependenciesArray)(arr, i, 'extras');
            }
            if (item === 'extras') {
                ob[item] = (0, parseUtils_1.buildExtrasObject)(arr, i);
            }
        });
        return ob;
    });
    return arrayOfPackageObjects;
});
exports.parseFileToArrayOfObjects = parseFileToArrayOfObjects;
