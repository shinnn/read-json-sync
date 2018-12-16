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
		/^RangeError.*Expected 1 or 2 arguments \(path\[, options\]\), but got no arguments\./u,
		'should throw an error when it takes no arguments.'
	);

	t.throws(
		() => readJsonSync('a', 'b', 'c'),
		/^RangeError.*Expected 1 or 2 arguments \(path\[, options\]\), but got 3 arguments\./u,
		'should throw an error when it takes too many arguments.'
	);

	t.throws(
		() => readJsonSync('package.json', false),
		/TypeError/u,
		'should throw an error when it takes invalid fs.readFile option.'
	);

	t.throws(
		() => readJsonSync('package.json', null),
		/^TypeError.*read-json-sync expected the encoding option to be a <string> /u,
		'should throw an error when it takes `null` as its second argument.'
	);

	t.throws(
		() => readJsonSync('package.json', {encoding: false}),
		/to convert file contents from <Buffer> to <string> before parsing it as JSON.*false was provided/u,
		'should throw an error when it takes a non-string encoding option.'
	);

	t.throws(
		() => readJsonSync('package.json', ''),
		/^TypeError.*read-json-sync expected the encoding option to be a non-empty <string>/u,
		'should throw an error when it takes an empty string as its second argument.'
	);

	t.throws(
		() => readJsonSync('package.json', {encoding: ''}),
		/^TypeError.* but '' \(empty string\) was provided\./u,
		'should throw an error when it takes an empty-string encoding option.'
	);

	t.throws(
		() => readJsonSync('package.json', {encoding: 'utf7'}),
		/The value "utf7" is invalid for option "encoding"/u,
		'should throw an error when it takes an invalid encoding option.'
	);

	t.throws(
		() => readJsonSync('foo'),
		/ENOENT/u,
		'should throw an error when the file doesn\'t exist.'
	);

	t.throws(
		() => readJsonSync('node_modules', {}),
		/EISDIR/u,
		'should throw an error when the path is a directory.'
	);

	t.throws(
		() => readJsonSync(__filename, 'utf8'),
		/SyntaxError/u,
		'should throw an error when it fails to parse the file.'
	);

	t.end();
});
