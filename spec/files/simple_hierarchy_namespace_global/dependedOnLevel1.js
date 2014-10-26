var domain = require('../../../index').domain;
var dependedOn = domain.require('dependedOnLevel2');

module.exports = function() {
	return dependedOn();
}