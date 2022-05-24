import * as fs from 'fs/promises';
import { IPackage } from '../interfaces/package';
import {
  buildDependenciesArray,
  buildExtrasObject,
  buildPackageObject,
  getPackageStringIndexes,
} from './parseUtils';

export const parseFileToArrayOfObjects = async (path: string) => {
  const data = await fs.readFile(path, { encoding: 'utf-8' });

  const fileAsAnArrayOfStrings: string[] = data
    .replaceAll(',', ' ')
    .replaceAll('[[package]]', 'package')
    .replaceAll('[package.dependencies]', 'dependencies')
    .replaceAll('[package.extras]', 'extras')
    .replace(/(\r\n|\n|\r)/gm, `,`)
    .replace(/=/g, `:`)
    .split(',')
    .filter(item => item !== `` && item !== `"`);

  // get package string indexes
  const arrOfIndexes = getPackageStringIndexes(
    fileAsAnArrayOfStrings,
    'package'
  );

  // get index of [metadata] string
  const metaIndex = fileAsAnArrayOfStrings.indexOf('[metadata]');

  // make each package as an array (in Array)
  const arrayOfPackageArrays = arrOfIndexes.map((index, i) => {
    // if file does not have metadata
    if (metaIndex === -1) {
      return fileAsAnArrayOfStrings.slice(index, arrOfIndexes[i + 1]);
    }

    // if file has metadata then remove it
    const fileAsAnArrayOfStringsWithoutMeta = fileAsAnArrayOfStrings.slice(
      0,
      metaIndex
    );
    return fileAsAnArrayOfStringsWithoutMeta.slice(index, arrOfIndexes[i + 1]);
  });

  const arrayOfPackageObjects = arrayOfPackageArrays.map(arr => {
    const ob: IPackage = {};
    arr.forEach((item, i) => {
      if (item === 'package') {
        ob[item] = buildPackageObject(arr);
      }

      if (item === 'dependencies') {
        ob[item] = buildDependenciesArray(arr, i, 'extras');
      }

      if (item === 'extras') {
        ob[item] = buildExtrasObject(arr, i);
      }
    });

    return ob;
  });

  return arrayOfPackageObjects;
};
