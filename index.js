/*!
 * read-json-sync | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/read-json-sync
*/
'use strict';

var fs = require('fs');

var bomRegex = /^\ufeff/g;

module.exports = function readJsonSync(filePath, options) {
  options = options || {};
  var buf = fs.readFileSync(filePath, options);
  return JSON.parse(buf.toString().replace(bomRegex, ''));
};
