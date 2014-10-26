var _u = require('underscore');
var winston = require('winston');
var Namespace = require('./Namespace');

module.exports = (function() {
    var namespaces = [];

    var createSync = function(associatedDir, name) {
        try
        {
            var namespace = new Namespace(name);
            
            if (associatedDir.lastIndexOf("/") < associatedDir.length - 1) {
                associatedDir += "/";
            }

            namespace.importAllFilesInDirectory(associatedDir);

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

    getNamespace.createSync = createSync;

    return getNamespace;
})();