'use strict';

const fs = require('graceful-fs');

module.exports = function readJsonSync(filePath, options) {
  return JSON.parse(String(fs.readFileSync(filePath, options)).replace(/^\ufeff/g, ''));
};
