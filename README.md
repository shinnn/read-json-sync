# read-json-sync

[![npm version](https://img.shields.io/npm/v/read-json-sync.svg)](https://www.npmjs.com/package/read-json-sync)
[![Build Status](https://travis-ci.org/shinnn/read-json-sync.svg?branch=master)](https://travis-ci.org/shinnn/read-json-sync)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/read-json-sync.svg)](https://david-dm.org/shinnn/read-json-sync)

A [Node.js](https://nodejs.org/) module to read and parse a [JSON](http://www.json.org/) file synchronously

```javascript
const readJsonSync = require('read-json-sync');

readJsonSync('package.json'); //=> {name: 'read-json-sync', version: '1.0.0', ...}
```

Node.js built-in [`require`](https://nodejs.org/api/globals.html#globals_require) and [`import`](https://nodejs.org/api/esm.html#esm_interop_with_existing_modules) can do almost the same thing, but this module doesn't [cache](https://nodejs.org/api/modules.html#modules_caching) results.

## Installation

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/getting-started/what-is-npm).

```
npm install read-json-sync
```

## API

```javascript
const readJsonSync = require('read-json-sync');
```

### readJsonSync(*path* [, *options*])

*path*: `string` [`Buffer`](https://nodejs.org/api/buffer.html#buffer_class_buffer) [`URL`](https://nodejs.org/api/url.html#url_class_url) (JSON filename) or `integer` (file descriptor)  
*options*: `Object` `string` ([`fs.readFile`](https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback) options or an encoding of the file)  
Return: `any` (parsed [JSON](https://tools.ietf.org/html/rfc7159) data)

It automatically ignores the leading [byte order mark](https://www.unicode.org/faq/utf_bom.html).

```javascript
// with-bom.json: '\uFEFF{"a": 1}'

JSON.parse('\uFEFF{"a": 1}'); // throws a SyntaxError

readJsonSync('with-bom.json'); //=> {a: 1}
```

## License

[ISC License](./LICENSE) © 2017 Shinnosuke Watanabe
