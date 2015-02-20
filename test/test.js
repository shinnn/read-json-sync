'use strict';

var readJsonSync = require('..');
var test = require('tape');

test('readJsonSync()', function(t) {
  t.plan(8);

  t.equal(readJsonSync.name, 'readJsonSync', 'should have a function name.');

  t.deepEqual(readJsonSync('test/fixture.json'), [1], 'should read and parse a JSON file.');

  t.deepEqual(
    readJsonSync('test/fixture-ucs2.json', {encoding: 'ucs2'}),
    [2],
    'should support fs.readFile options.'
  );

  t.throws(function() {
    readJsonSync();
  }, /TypeError.*path/, 'should throw an error when it takes no arguments.');

  t.throws(function() {
    readJsonSync('package.json', true);
  }, /Bad/, 'should throw an error when it takes invalid fs.readFile option.');

  t.throws(function() {
    readJsonSync('foo', null);
  }, /ENOENT/, 'should throw an error when the file doesn\'t exist.');

  t.throws(function() {
    readJsonSync('node_modules', {});
  }, /EISDIR/, 'should throw an error when the path is a directory.');

  t.throws(function() {
    readJsonSync(__filename, 'utf8');
  }, /SyntaxError/, 'should throw an error when it fails to parse the file.');
});
