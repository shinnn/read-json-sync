'use strict';

var readJsonSync = require('require-main')();
var test = require('tape');

test('readJsonSync()', function(t) {
  t.plan(6);

  t.equal(
    readJsonSync('package.json').name, 'read-json-sync',
    'should read and parse JSON file.'
  );

  t.throws(
    readJsonSync.bind(null, 'package.json', {encoding: 'foo'}),
    /Unknown encoding/,
    'should accept fs.readFileSync options.'
  );

  t.throws(
    readJsonSync.bind(null), /path/,
    'should throw an error when it takes no arguments.'
  );

  t.throws(
    readJsonSync.bind(null, 'package.json', true), /Bad/,
    'should throw an error when it takes invalid fs.readFileSync option.'
  );

  t.throws(
    readJsonSync.bind(null, 'foo'), /ENOENT/,
    'should throw an error when the file doesn\'t exist.'
  );

  t.throws(
    readJsonSync.bind(null, 'index.js'), /Unexpected token/,
    'should throw an error when the file is not a valid JSON.'
  );
});
