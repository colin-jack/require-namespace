var namespace = require('../../../index');
var dependedOn = namespace('domain').require('dependedOnLevel3');

module.exports = function() {
	return dependedOn();
}