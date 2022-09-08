#!/usr/bin/env node

import { program } from 'commander';
import { readFileSync } from 'node:fs';
import _ from 'lodash';

const genDiff = (filepath1, filepath2) => {
    const jsonData1 = readFileSync(filepath1, 'utf-8');
    const jsonData2 = readFileSync(filepath2, 'utf-8');
    const data1 = JSON.parse(jsonData1);
    const data2 = JSON.parse(jsonData2);
    const keysData1 = _.keys(data1);
    const keysData2 = _.keys(data2);
    const entries = _.union(keysData1, keysData2);
    entries.sort();

    const result = entries.map((key) => {
      if (!_.has(data1, key)) {
        return `+ ${key}: ${data1[key]}`
      } else if (!_.has(data2, key)) {
        return `- ${key}: ${data1[key]}`
      } else if (_.has(data1, key) && _.has(data2, key) && data1[key] === data2[key]) {
        return `${key}: ${data1[key]}`
      } else if (data1[key] !== data2[key]) {
        return `- ${key}: ${data1[key]}\n+ ${key}: ${data2[key]}`
      } else {
        return `${key}: ${data1[key]}`
      }
    })
    console.log(`{\n${result.join('\n')}\n}`)
}
program
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format <type>', 'output format')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .action((filepath1, filepath2) => {
        console.log(genDiff(filepath1, filepath2));
    })
program.parse();
