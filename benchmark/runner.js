'use strict';

const {promisify} = require('util');
const {readFile} = require('graceful-fs');
const {performance} = require('perf_hooks');
const {join} = require('path');
const {deepEqual} = require('assert');

const {green, cyan} = require('chalk');

const promisifiedReadFile = promisify(readFile);

const fn = require(join(__dirname, process.argv[2]));
const title = fn.title;

const fixturePath = join(__dirname, '..', 'test', 'fixture.json');
const fixturePathWithBom = join(__dirname, '..', 'test', 'fixture-bom.json');
(async () => {
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
    console.log(`${fixtureName} ${performance.getEntriesByName(fixtureName)[0].duration}`);
    performance.clearMeasures(fixtureName);

    for (const mark of marks) {
      performance.clearMarks(mark);
    }
  }

  performance.mark('end');
  performance.measure('sum', 'start', 'end');
  console.log(cyan(`TOTAL            ${performance.getEntriesByName('sum')[0].duration}\n`));
})();
