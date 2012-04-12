var namespace = require('require-namespace');
var dependedOn = namespace('domain').require('dependedOnLevel1');

module.exports = function() {
	return dependedOn();
}