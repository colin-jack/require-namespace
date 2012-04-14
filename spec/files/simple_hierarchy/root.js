var namespace = require('../../../index');
var dependedOn = namespace('domain').require('dependedOnLevel1');

module.exports = function() {
	return dependedOn();
}