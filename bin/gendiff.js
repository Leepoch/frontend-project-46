#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2));
  });
program.parse();
