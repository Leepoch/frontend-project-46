import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.resolve(__dirname, '../__fixtures__/', filename);
const stylish = readFileSync(getFixturePath('formatStylish.txt'), 'utf-8');
const plain = readFileSync(getFixturePath('formatPlain.txt'), 'utf-8');
const json = readFileSync(getFixturePath('formatJson.txt'), 'utf-8');

test(('diffStylish'), () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toBe(stylish);
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'))).toEqual(stylish);
});
test(('diffPlain'), () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toBe(plain);
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'plain')).toEqual(plain);
});
test(('diffJson'), () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toBe(json);
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'json')).toEqual(json);
});
