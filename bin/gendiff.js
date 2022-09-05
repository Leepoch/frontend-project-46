#!/usr/bin/env node

import { program } from 'commander';
import { readFileSync } from 'node:fs';
import _ from 'lodash';

const genDiff = (filepath1, filepath2) => {
    const jsonData1 = readFileSync(filepath1, 'utf-8');
    const jsonData2 = readFileSync(filepath2, 'utf-8');
    const data1 = JSON.parse(jsonData1);
    const data2 = JSON.parse(jsonData2);
    const result = {};
    const entries = Object.entries(data1)

    for (let [key, value] of entries) {
        if (_.has(data2, key) && data2[key] !== data1[key]) {
            result[`- ${key}`] = data1[key];
            result[`+ ${key}`] = data2[key];
        } else if (!_.has(data1, key)) {
            result[`+ ${key}`] = value
        } else if (_.has(data2, key) && data2[key] === data1[key]) {
            result[key] = value;
        } else {
            result[`- ${key}`] = data1[key];
        };
    };
    console.log(result);
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
