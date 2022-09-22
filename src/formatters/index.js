import plain from './plain.js';
import stylish from './stylish.js';

export default (diffTree, type) => {
  switch (type) {
    case 'stylish':
      return stylish(diffTree);
    case 'plain':
      return plain(diffTree);
    case 'json':
      return JSON.stringify(diffTree);
    default:
      return new Error(`Type ${type} not supported`);
  }
};
