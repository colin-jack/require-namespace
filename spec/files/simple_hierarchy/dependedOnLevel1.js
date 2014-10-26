var domain = require('../../../index').domain;

dependedOnLevel2 = domain.require('dependedOnLevel2');

module.exports = function() {
	return dependedOnLevel2();
}