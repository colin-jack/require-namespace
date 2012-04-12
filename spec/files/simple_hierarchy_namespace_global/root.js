var dependedOn = domain.require('dependedOnLevel1');

module.exports = function() {
	return dependedOn();
}