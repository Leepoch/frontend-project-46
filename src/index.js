import { readFileSync } from 'node:fs';
import path from 'node:path';
import parse from './parsers.js';
import buildDiff from './buildTree.js';
import format from './formatters/index.js';

const genDiff = (filepath1, filepath2, type = 'stylish') => {
  const jsonData1 = readFileSync(path.resolve(process.cwd(), filepath1), 'utf-8');
  const jsonData2 = readFileSync(path.resolve(process.cwd(), filepath2), 'utf-8');
  const data1 = parse(jsonData1, path.extname(filepath1));
  const data2 = parse(jsonData2, path.extname(filepath2));
  const diffTree = buildDiff(data1, data2);
  return format(diffTree, type);
};

genDiff('./__fixtures__/file1.json', './__fixtures__/file2.json');

export default genDiff;
