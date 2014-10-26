var domain = require('../../../index').domain;
var dependedOn = domain.require('dependedOnLevel1');

module.exports = function() {
	return dependedOn();
}