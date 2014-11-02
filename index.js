var Namespaces = require('./lib/Namespaces');

var api = Object.create(Namespaces);

// The expectation is this will mainly be used in testing where we want to replace modules with test doubles.
api.AllowTestDoubles = require('./lib/property_assigners/WithTestDoublesPropertyAssigner')

api.removeNamespace = function () {
    throw new Error("removeNamespace is now obsolete and has been replaced with remove.")
}

module.exports = api;