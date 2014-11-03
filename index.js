var Namespaces = require('./lib/Namespaces');

var api = Object.create(Namespaces);

api.removeNamespace = function () {
    throw new Error("removeNamespace is now obsolete and has been replaced with remove.")
}

module.exports = api;