var namespace = require('../../../index');
var dependedOn = namespace('domain').require('dependedOnLevel2');

module.exports = function() {
	return dependedOn();
}