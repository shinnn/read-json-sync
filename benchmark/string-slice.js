'use strict';

module.exports = data => {
	const str = data.toString();

	return JSON.parse(str.charCodeAt(0) === 65279 ? /* 0xFEFF */ str.slice(1) : str);
};

module.exports.title = 'String#slice() (current implementation)';
