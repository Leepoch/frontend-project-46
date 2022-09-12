import { readFileSync } from 'node:fs';
import _ from 'lodash';
import path from 'node:path';
import parse from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const jsonData1 = readFileSync(path.resolve(process.cwd(), filepath1), 'utf-8');
  const jsonData2 = readFileSync(path.resolve(process.cwd(), filepath2), 'utf-8');
  const data1 = parse(jsonData1, path.extname(filepath1));
  const data2 = parse(jsonData2, path.extname(filepath2));
  const entries = _.union(Object.keys(data1), Object.keys(data2));
  entries.sort();

  const result = entries.flatMap((key) => {
    if (!_.has(data1, key)) {
      return `  + ${key}: ${data2[key]}`;
    } if (!_.has(data2, key)) {
      return `  - ${key}: ${data1[key]}`;
    } if (data1[key] !== data2[key]) {
      const str1 = `  - ${key}: ${data1[key]}`;
      const str2 = `  + ${key}: ${data2[key]}`;
      return [str1, str2];
    }
    return `    ${key}: ${data1[key]}`;
  });
  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;
