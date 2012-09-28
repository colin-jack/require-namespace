var _u = require('underscore');
var winston = require('winston');
var Namespace = require('./Namespace');

module.exports = (function() {
    var namespaces = [];

    var registerNamespace = function(name, associatedDir, done) {
        try
        {
            var namespace = new Namespace(name);
            namespace.importAllFilesInDirectory(associatedDir, done);

            namespaces.push(namespace);

            return namespace;
        }
        catch(ex)
        {
            winston.error('namespace: error registering: "' + ex + '"');
            throw ex;
        }
    };

    var getNamespace = function(groupName) {
        return _u.find(namespaces, function(group) {
            return group.name === groupName;
        });
    }

    getNamespace.create = registerNamespace;

    return getNamespace;
})();