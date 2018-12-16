'use strict';

const BOM_REGEXP = /^\ufeff/u;

module.exports = data => JSON.parse(data.toString().replace(BOM_REGEXP, ''));

module.exports.title = 'String#replace()';
