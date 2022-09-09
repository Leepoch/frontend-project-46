import genDiff from '../bin/gendiff.js';

const file1 = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

const file2 = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};
const receved = '{- follow: false\nhost: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20+\n verbose:undefined\n}\nundefined';

test(('difference'), () => {
  expect(genDiff(file1, file2)).toEqual(receved);
});
