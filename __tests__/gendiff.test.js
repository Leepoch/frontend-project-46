// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
import genDiff from '../src/index.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const getFixturePath = (filename) => path.resolve(__dirname, '../__fixtures__/', filename);

const text = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
test(('difference json'), () => {
  expect(genDiff('./__fixtures__/file1.json', './__fixtures__/file2.json')).toEqual(text);
  expect(genDiff('./__fixtures__/file1.yml', './__fixtures__/file2.yml')).toEqual(text);
  expect(genDiff('./__fixtures__/file1.yaml', './__fixtures__/file2.yaml')).toEqual(text);
});
