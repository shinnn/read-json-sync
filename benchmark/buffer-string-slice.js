'use strict';

module.exports = function readJsonSync(data) {
  if (Buffer.isBuffer(data)) {
    if (data[0] === 239 /* 0xEF */ && data[1] === 187 /* 0xBB */ && data[2] === 191 /* 0xBF */) {
      return JSON.parse(data.slice(3).toString());
    }

    return JSON.parse(data.toString());
  }

  return JSON.parse(data.charCodeAt(0) === 65279 ? /* 0xFEFF */ data.slice(1) : data);
};

module.exports.title = 'Buffer#slice() and String#slice()';
