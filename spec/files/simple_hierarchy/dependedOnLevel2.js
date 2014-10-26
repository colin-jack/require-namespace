var domain = require('../../../index').domain;

dependedOnLevel3 = domain.require('dependedOnLevel3');

module.exports = function() {
	return dependedOnLevel3();
}