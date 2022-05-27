"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackageStringIndexes = exports.buildDependenciesArray = exports.buildExtrasObject = exports.buildPackageObject = void 0;
function buildPackageObject(arr) {
    const packageOb = {};
    for (let index = 0; index < arr.length; index++) {
        if (arr[index] === 'dependencies' || arr[index] === 'extras')
            break;
        const properties = arr[index].split(':');
        if (index > 0 && !properties[0].includes('version')) {
            const key = properties[0].trim();
            const value = properties[1].trim().replaceAll(`"`, '');
            const isTrue = value === 'true';
            packageOb[key] = key === 'optional' ? Boolean(isTrue) : value;
        }
    }
    return packageOb;
}
exports.buildPackageObject = buildPackageObject;
function buildExtrasObject(arr, i) {
    const extrasOb = {};
    for (let index = 0; index < arr.length; index++) {
        if (index > i) {
            const properties = arr[index]
                .replace(/(\(.*?\))/g, '')
                .replaceAll('[', '')
                .replaceAll(']', '')
                .replace(/\s/g, '')
                .split(':');
            extrasOb[properties[0].trim()] = properties[1]
                .slice(1, properties[1].length - 1)
                .split(`""`);
            // console.log(properties[1].slice(1, properties[1].length - 1).split(`""`));
        }
    }
    return extrasOb;
}
exports.buildExtrasObject = buildExtrasObject;
function buildDependenciesArray(arr, i, breakPoint = '') {
    const dependenciesArray = [];
    for (let index = 0; index < arr.length; index++) {
        if (arr[index] === breakPoint)
            break;
        const properties = arr[index].split(':');
        if (index > i &&
            !properties[0].startsWith('<') &&
            !properties[0].startsWith('>')) {
            dependenciesArray.push(properties[0].trim());
        }
    }
    return dependenciesArray;
}
exports.buildDependenciesArray = buildDependenciesArray;
function getPackageStringIndexes(arr, val) {
    const indexes = [];
    for (let i = 0; i < arr.length; i++)
        if (arr[i] === val)
            indexes.push(i);
    return indexes;
}
exports.getPackageStringIndexes = getPackageStringIndexes;
