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

  // amount of packages and package indexes
  const arrOfIndexes = getPackageStringIndexes(
    fileAsAnArrayOfStrings,
    'package'
  );

  const arrayOfPackageArrays = arrOfIndexes.map((index, i) => {
    return fileAsAnArrayOfStrings.slice(index, arrOfIndexes[i + 1]);
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
