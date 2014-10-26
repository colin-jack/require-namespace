var _u = require('underscore');
var winston = require('winston');
var Namespace = require('./Namespace');

module.exports = (function() {
    var createSync = function(associatedDir, name) {
        try
        {
            var namespace = new Namespace(name);
            
            if (associatedDir.lastIndexOf("/") < associatedDir.length - 1) {
                associatedDir += "/";
            }

            namespace.importAllFilesInDirectory(associatedDir);
            
            if (name) {
                this[name] = namespace;
            }

            return namespace;
        }
        catch(ex)
        {
            winston.error('namespace: error registering: "' + ex + '"');
            throw ex;
        }
    };

    return {
        createSync: createSync
    };
})();