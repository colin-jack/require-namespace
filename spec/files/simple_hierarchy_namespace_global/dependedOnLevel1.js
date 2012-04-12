var namespace = require('require-namespace');
var dependedOn = namespace('domain').require('dependedOnLevel2');

module.exports = function() {
	return dependedOn();
}