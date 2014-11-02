var Namespaces = require('./lib/Namespaces');

module.exports = Namespaces;

module.exports.remove = function () {
    throw new Error("removeNamespace is now obsolete and has been replaced with remove.")
}