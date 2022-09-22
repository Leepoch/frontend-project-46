import _ from 'lodash';

const getComplexValue = (value) => {
  if (_.isObject(value) === true) {
    return '[complex value]';
  }
  if ((value === true) || (value === false) || (typeof (value) === 'number')) {
    return `${value}`;
  }
  if (typeof (value) === 'string') {
    return `'${value}'`;
  }
  return null;
};

export default (diff) => {
  const iter = (tree, acc) => {
    const result = tree.map((node) => {
      const path = [...acc, node.key].join('.');
      switch (node.type) {
        case 'added':
          return `Property '${path}' was added with value: ${getComplexValue(node.value)}`;
        case 'removed':
          return `Property '${path}' was removed`;
        case 'unchanged':
          return null;
        case 'changed':
          return `Property '${path}' was updated. From ${getComplexValue(node.value1)} to ${getComplexValue(node.value2)}`;
        case 'nested':
          return `${iter(node.value, [path])}`;
        default:
          return new Error('This tree is bad. Try another tree');
      }
    });
    return _.compact(result).join('\n');
  };
  return iter(diff, []);
};
