import _ from 'lodash';

const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 4);

const formatValue = (value, depth) => {
  if (!_.isObject(value)) {
    return String(value);
  }
  const formatedString = Object.entries(value).map(([name, innerValue]) => {
    const object = { name, value: innerValue };
    return `${indent(depth)}  ${object.name}: ${formatValue(object.value, depth + 1)}`;
  });
  return `{\n${formatedString.join('\n')}\n${indent(depth)}}`;
};

export default (diff) => {
  const iter = (tree, depth) => {
    const result = tree.flatMap((node) => {
      switch (node.type) {
        case 'added':
          return `${indent(depth)}+ ${node.key}: ${formatValue(node.value, depth + 1)}`;
        case 'removed':
          return `${indent(depth)}- ${node.key}: ${formatValue(node.value, depth + 1)}`;
        case 'unchanged':
          return `${indent(depth)}  ${node.key}: ${formatValue(node.value, depth + 1)}`;
        case 'changed':
          return `${indent(depth)}- ${node.key}: ${formatValue(node.value1, depth + 1)}\n${indent(depth)}+ ${node.key}: ${formatValue(node.value2, depth + 1)}`;
        case 'nested':
          return `${indent(depth)}  ${node.key}: ${iter(node.value, depth + 1)}`;
        default:
          return new Error('This tree is bad. Try another tree');
      }
    });
    return `{\n${result.join('\n')}\n${indent(depth)}}`;
  };
  return iter(diff, 1);
};
