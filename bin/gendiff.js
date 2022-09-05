#!/usr/bin/env node

import { program } from 'commander';
import { readFileSync } from 'node:fs';

const genDiff = (filepath1, filepath2) => {
    const jsonData = readFileSync('file1.json');
    const parseData = JSON.parse(jsonData); 
    return parseData;
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
    .parse()

