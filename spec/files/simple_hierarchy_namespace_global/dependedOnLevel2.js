var namespace = require('require-namespace');
var dependedOn = namespace('domain').require('dependedOnLevel3');

module.exports = function() {
	return dependedOn();
}