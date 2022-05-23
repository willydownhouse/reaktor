const fs = require('fs/promises');

const parseFileToArrayOfObjects = async path => {
  const data = await fs.readFile(path, { encoding: 'utf-8' });

  const fileAsAnArrayOfStrings = data
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
    const ob = {};
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

// parseFileToArrayOfObjects('poetry.lock.toml').then(res => console.log(res));

function buildPackageObject(arr) {
  const packageOb = {};
  for (let index = 0; index < arr.length; index++) {
    if (arr[index] === 'dependencies' || arr[index] === 'extras') break;

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

function buildDependenciesArray(arr, i, breakPoint = '') {
  const dependenciesArray = [];

  for (let index = 0; index < arr.length; index++) {
    if (arr[index] === breakPoint) break;

    const properties = arr[index].split(':');

    if (
      index > i &&
      !properties[0].startsWith('<') &&
      !properties[0].startsWith('>')
    ) {
      dependenciesArray.push(properties[0].trim());
    }
  }

  return dependenciesArray;
}

function getPackageStringIndexes(arr, val) {
  var indexes = [],
    i;
  for (i = 0; i < arr.length; i++) if (arr[i] === val) indexes.push(i);
  return indexes;
}
