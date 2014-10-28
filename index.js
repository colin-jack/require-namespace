var _u = require('underscore');
var winston = require('winston');
var Namespace = require('./Namespace');
var fs = require('fs');

var createSync = function(associatedDir, name) {
    try {
        validateArguments(associatedDir, name, this);

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

var removeNamespace = function (name) {
    delete this[name];
}
    
var validateArguments = function (directoryPath, name, holderOfExistingNamespaces) {
    var directoryPathIsNotString = typeof directoryPath != 'string' && !(directoryPath instanceof String);

    if (directoryPathIsNotString || directoryPath.length == 0) {
        throw new ReferenceError("You must provide the directory path to scan.");
    }
        
    if (!fs.existsSync(directoryPath)) {
        var message = "The specified directory does not exist " + directoryPath + ".";
        throw new ReferenceError(message);
    }
        
    if (name !== undefined && name != null && holderOfExistingNamespaces.hasOwnProperty(name)) {
        throw new Error("You cannot create another namespace with the name '" + name + "'.")
    }
}

module.exports = {
    createSync: createSync,
    removeNamespace: removeNamespace
};