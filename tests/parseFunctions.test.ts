import { parseFileToArrayOfObjects } from '../src/utils/parseFile';
import {
  buildPackageObject,
  buildDependenciesArray,
  buildExtrasObject,
} from '../src/utils/parseUtils';

const packageArray = [
  'package',
  'haloo: tere',
  'optional: true',
  'version: 123',
  'dependencies',
  'packaging:',
  '>43432',
  'tere',
  'extras',
  'socks : ["PySocks (>:1.5.6 !:1.5.7)"  "win-inet-pton"]',
  'use_chardet_on_py3 : ["chardet (>:3.0.2 <5)"]',
];

describe('PARSING RELATED FUNCTIONS', () => {
  test('FUNCTION: parseFileToArrayOfObjects(test.toml) -> return array of 4 packages', async () => {
    const data = await parseFileToArrayOfObjects('test.toml');

    expect(data.length).toBe(4);
    expect(data[0].dependencies!.length).toBe(3);
  });
  test('FUNCTION: parseFileToArrayOfObjects(poetry.lock.toml) -> return array of 70 packages', async () => {
    const data = await parseFileToArrayOfObjects('poetry.lock.toml');

    expect(data.length).toBe(70);
  });
  test('FUNCTION: buildPackageObject', async () => {
    const packageOb = buildPackageObject(packageArray);

    expect(packageOb.version).not.toBeDefined();
    expect(packageOb.haloo).toBeDefined();
    expect(packageOb.optional).toBe(true);
  });
  test('FUNCTION: buildDependenciesArray', async () => {
    const dependencies = buildDependenciesArray(packageArray, 4, 'extras');

    expect(dependencies).toHaveLength(2);
    expect(dependencies).not.toContain('>43432');
    expect(dependencies).toContain('packaging');
    expect(dependencies).toContain('tere');
  });
  test('FUNCTION: buildExtrasObject', async () => {
    const extras = buildExtrasObject(packageArray, 8);

    console.log(extras);

    expect(extras.socks).toHaveLength(2);
    expect(extras.socks).toContain('PySocks');

    expect(extras.use_chardet_on_py3).toHaveLength(1);
    expect(extras.use_chardet_on_py3).toContain('chardet');
  });
});
