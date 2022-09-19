// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
import genDiff from '../src/index.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const getFixturePath = (filename) => path.resolve(__dirname, '../__fixtures__/', filename);

const text = `{
  common: {
    + follow: false
      setting1: Value 1
    - setting2: 200
    - setting3: true
    + setting3: null
    + setting4: blah blah
    + setting5: {
          key5: value5
      }
      setting6: {
          doge: {
            - wow: 
            + wow: so much
          }
          key: value
        + ops: vops
      }
  }
  group1: {
    - baz: bas
    + baz: bars
      foo: bar
    - nest: {
          key: value
      }
    + nest: str
  }
- group2: {
      abc: 12345
      deep: {
          id: 45
      }
  }
+ group3: {
      deep: {
          id: {
              number: 45
          }
      }
      fee: 100500
  }
}`;

test(('difference'), () => {
  expect(genDiff('./__fixtures__/file1.json', './__fixtures__/file2.json')).toEqual(text);
  expect(genDiff('./__fixtures__/file1.yml', './__fixtures__/file2.yml')).toEqual(text);
  expect(genDiff('./__fixtures__/file1.yaml', './__fixtures__/file2.yaml')).toEqual(text);
});
