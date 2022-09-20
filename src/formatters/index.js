import stylish from './stylish.js';

export default (diffTree, type) => {
  switch (type) {
    case 'stylish':
      return stylish(diffTree);
    default:
      return new Error(`Type ${type} not supported`);
  }
};
