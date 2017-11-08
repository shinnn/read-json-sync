'use strict';

const {readFileSync} = require('graceful-fs');

module.exports = function readJsonSync(...args) {
  const argLen = args.length;

  if (argLen !== 1 && argLen !== 2) {
    throw new RangeError(`Expected 1 or 2 arguments (path[, options]), but got ${
      argLen === 0 ? 'no' : argLen
    } arguments.`);
  }

  const str = readFileSync(...args).toString();

  return JSON.parse(str.charCodeAt(0) === 65279 ? /* 0xFEFF */ str.slice(1) : str);
};
