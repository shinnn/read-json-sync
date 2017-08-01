'use strict';

const {readFileSync} = require('graceful-fs');

module.exports = function readJsonSync(filePath, options) {
  return JSON.parse(readFileSync(filePath, options).toString().replace(/^\ufeff/g, ''));
};
