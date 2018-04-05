import { parse } from './query.mjs';

const matchers = {
  default: (entry, query, options) => {
    if (options.i) {
      return (new RegExp(`\\b${query}\\b`, 'i')).test(entry);
    }
    return (new RegExp(`\\b${query}\\b`)).test(entry);
  },
  has: (entry, query, options) => {
    if (options.i) {
      return entry.toLowerCase().indexOf(query.toLowerCase()) >= 0;
    }
    return entry.indexOf(query) >= 0;
  },
  eqeq: (entry, query, options) => {
    if (options.i) {
      return entry.toLowerCase() === query.toLowerCase();
    }
    return entry === query;
  },
};

const ops = {
  and: (matcher, entry, ast, options) => {
    return check(matcher, entry, ast.left, options) && check(matcher, entry, ast.right, options);
  },
  or: (matcher, entry, ast, options) => {
    return check(matcher, entry, ast.left, options) || check(matcher, entry, ast.right, options);
  },
  noeq: (matcher, entry, ast, options) => {
    return !check(entry, ast.right, options);
  },
  eq: (matcher, entry, ast, options) => {
    return matcher(entry, ast.right, options);
  },
};

const check = (matcher, entry, ast, options) => {
  return ops[ast.op](matcher, entry, ast, options);
};

export default (query) => {
  const ast = parse(query);
  return (entry, options = {}) => {
    if (options.i === undefined) { options.i = true; }

    let customMatcher = options.matcher;
    let matcher = null;
    if (customMatcher) {
      if (typeof customMatcher == 'string') {
        matcher = matchers[customMatcher];
      }
      if (typeof customMatcher == 'function') {
        matcher = customMatcher;
      }
    } else {
      matcher = matchers['default'];
    }
    if (!matcher) {
      throw new Error('Matcher not found');
    }

    return check(matcher, entry, ast, options);
  };
};
