import _ from 'lodash';

const space = '    ';

const formatValue = (value, depth) => {
  if (!_.isObject(value)) {
    return String(value);
  }
  const formatedString = Object.entries(value).map(([name, innerValue]) => {
    const object = { name, value: innerValue };
    return `${space.repeat(depth)}  ${object.name}: ${formatValue(object.value, depth + 1)}`;
  });
  return `{\n${formatedString.join('\n')}\n${space.repeat(depth)}}`;
};

export default (diff) => {
  const iter = (tree, depth) => {
    const result = tree.flatMap((node) => {
      switch (node.type) {
        case 'added':
          return `${space.repeat(depth)}+ ${node.key}: ${formatValue(node.value, depth + 1)}`;
        case 'removed':
          return `${space.repeat(depth)}- ${node.key}: ${formatValue(node.value, depth + 1)}`;
        case 'unchanged':
          return `${space.repeat(depth)}  ${node.key}: ${formatValue(node.value, depth + 1)}`;
        case 'changed':
          return `${space.repeat(depth)}- ${node.key}: ${formatValue(node.value2, depth + 1)}\n${space.repeat(depth)}+ ${node.key}: ${formatValue(node.value1, depth + 1)}`;
        case 'nested':
          return `${space.repeat(depth)}  ${node.key}: ${iter(node.value, depth + 1)}`;
        default:
          return new Error('This tree is bad. Try another tree');
      }
    });
    return `{\n${result.join('\n')}\n${space.repeat(depth)}}`;
  };
  return iter(diff, 0);
};
