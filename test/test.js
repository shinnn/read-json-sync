'use strict';

const readJsonSync = require('..');
const test = require('tape');

test('readJsonSync()', t => {
  t.deepEqual(readJsonSync('test/fixture.json'), [1], 'should read and parse a JSON file.');

  t.deepEqual(
    readJsonSync('test/fixture-ucs2.json', {encoding: 'ucs2'}),
    [2],
    'should support fs.readFile options.'
  );

  t.deepEqual(
    readJsonSync('test/fixture-bom.json', undefined),
    [3],
    'should strip BOM before parsing the file.'
  );

  t.throws(
    () => readJsonSync(),
    /^RangeError.*Expected 1 or 2 arguments \(path\[, options]\), but got no arguments\./,
    'should throw an error when it takes no arguments.'
  );

  t.throws(
    () => readJsonSync('a', 'b', 'c'),
    /^RangeError.*Expected 1 or 2 arguments \(path\[, options]\), but got 3 arguments\./,
    'should throw an error when it takes no arguments.'
  );

  t.throws(
    () => readJsonSync('package.json', true),
    /TypeError/,
    'should throw an error when it takes invalid fs.readFile option.'
  );

  t.throws(
    () => readJsonSync('foo', null),
    /ENOENT/,
    'should throw an error when the file doesn\'t exist.'
  );

  t.throws(
    () => readJsonSync('node_modules', {}),
    /EISDIR/,
    'should throw an error when the path is a directory.'
  );

  t.throws(
    () => readJsonSync(__filename, 'utf8'),
    /SyntaxError/,
    'should throw an error when it fails to parse the file.'
  );

  t.end();
});
