var _u = require('underscore');
var winston = require('winston');
var Namespace = require('./Namespace');
var fs = require('fs');

module.exports = (function() {
    var createSync = function(associatedDir, name) {
        try {
            validateArguments(associatedDir);

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
    
    var validateArguments = function (directoryPath) {
        var directoryPathIsNotString = typeof directoryPath != 'string' && !(directoryPath instanceof String);

        if (directoryPathIsNotString || directoryPath.length == 0) {
            throw new ReferenceError("You must provide the directory path to scan.");
        }
        
        if (!fs.existsSync(directoryPath)) {
            var message = "The specified directory does not exist " + directoryPath + ".";
            throw new ReferenceError(message);
        }
    }

    return {
        createSync: createSync
    };
})();