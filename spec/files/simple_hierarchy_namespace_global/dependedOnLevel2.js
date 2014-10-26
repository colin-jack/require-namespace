var domain = require('../../../index').domain;
var dependedOn = domain.require('dependedOnLevel3');

module.exports = function() {
	return dependedOn();
}