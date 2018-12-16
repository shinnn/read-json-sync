'use strict';

const {deepEqual} = require('assert').strict;
const {join} = require('path');
const {performance, PerformanceObserver} = require('perf_hooks');
const {promisify} = require('util');
const {readFile} = require('fs');

const {green, cyan} = require('chalk');

const promisifiedReadFile = promisify(readFile);

const fn = require(join(__dirname, process.argv[2]));
const {title} = fn;

const fixturePath = join(__dirname, '..', 'test', 'fixture.json');
const fixturePathWithBom = join(__dirname, '..', 'test', 'fixture-bom.json');

(async () => {
	new PerformanceObserver((list, observer) => {
		const [{name, duration}] = list.getEntries();

		if (name === 'sum') {
			console.log(cyan(`TOTAL            ${duration}\n`));
			observer.disconnect();
			return;
		}

		console.log(`${name} ${duration}`);
	}).observe({entryTypes: ['measure']});
	console.log(green.bold(title));

	const [
		fixtureBuffer,
		fixtureString,
		fixtureBufferWithBom,
		fixtureStringWithBom
	] = await Promise.all([
		[fixturePath],
		[fixturePath, 'utf8'],
		[fixturePathWithBom],
		[fixturePathWithBom, 'utf8']
	].map(args => promisifiedReadFile(...args)));

	deepEqual(fn(fixtureBuffer), [1]);
	deepEqual(fn(fixtureString), [1]);
	deepEqual(fn(fixtureBufferWithBom), [3]);
	deepEqual(fn(fixtureStringWithBom, 'utf8'), [3]);

	performance.mark('start');

	for (const [fixtureName, fixture] of new Map([
		['buffer           ', fixtureBuffer],
		['string           ', fixtureString],
		['buffer with BOM  ', fixtureBufferWithBom],
		['string with BOM  ', fixtureStringWithBom]
	])) {
		const marks = [`${fixtureName} start`, `${fixtureName} end`];
		let i = 1500000;

		performance.mark(marks[0]);

		while (i--) {
			fn(fixture);
		}

		performance.mark(marks[1]);
		performance.measure(fixtureName, ...marks);
	}

	performance.mark('end');
	performance.measure('sum', 'start', 'end');
})();
