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
  and: (ast, ...args) => check(ast.left, ...args) && check(ast.right, ...args),
  or: (ast, ...args) => check(ast.left, ...args) || check(ast.right, ...args),
  noeq: (ast, ...args) => !check(ast.right, ...args),
  eq: (ast, matcher, entry, options) => matcher(entry, ast.right, options),
};

const check = (ast, matcher, entry, options) => {
  return ops[ast.op](ast, matcher, entry, options);
};

export default (query, defaults = {}) => {
  const ast = parse(query);

  if (defaults.i === undefined) { defaults.i = true; }

  return (entry, options = {}) => {
    let opt = {...defaults, ...options};

    let customMatcher = opt.matcher;
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

    return check(ast, matcher, entry, opt);
  };
};
