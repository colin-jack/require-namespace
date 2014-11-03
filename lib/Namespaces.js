var _u = require('underscore');
var winston = require('winston');
var fs = require('fs');
var Namespace = require('./Namespace');
var defaultmoduleLoader = require('./module_loaders/DefaultmoduleLoader');

var validNameRegex = /^[a-z0-9]+$/i

var create = function (associatedDir, name, moduleLoader) {
    try {
        validateNamespaceArguments(associatedDir, name, moduleLoader, this);
        
        var moduleLoader = moduleLoader || defaultmoduleLoader;
        
        var newNamespace = new Namespace(name, moduleLoader);
        
        if (associatedDir.lastIndexOf("/") < associatedDir.length - 1) {
            associatedDir += "/";
        }
        
        newNamespace.importAllFilesInDirectory(associatedDir);
        
        if (name) {
            this[name] = newNamespace;
        }
        
        return newNamespace;
    }
    catch (ex) {
        winston.error('namespace: error registering: "' + ex + '"');
        throw ex;
    }
};

var remove = function (name) {
    delete this[name];
}

var validateNamespaceArguments = function (directoryPath, name, moduleLoader, holderOfExisingNamespaces) {
    var directoryPathIsNotString = typeof directoryPath != 'string' && !(directoryPath instanceof String);
    
    if (directoryPathIsNotString || directoryPath.length == 0) {
        throw new ReferenceError("You must provide the directory path to scan.");
    }
    
    if (moduleLoader) {
        if (!moduleLoader.assignProperty || typeof moduleLoader.assignProperty != "function") {
            throw new ReferenceError("If provided the module loader must be an object with a method 'assignProperty'.");
        }
    }
    
    if (!fs.existsSync(directoryPath)) {
        var message = "The specified directory does not exist " + directoryPath + ".";
        throw new ReferenceError(message);
    }
    
    if (name !== undefined && name != null) {
        if (holderOfExisingNamespaces.hasOwnProperty(name)) {
            throw new ReferenceError("You cannot create another namespace with the name '" + name + "'.")
        }
        
        var nameIsString = typeof name == 'string' || name instanceof String;
        
        if (!nameIsString) {
            throw new ReferenceError("The namespace name should be a string which uniquely identifies that namespace.")
        }
        
        if (validNameRegex.test(name) == false) {
            throw new ReferenceError("The namespace name must be a string with only alpha numeric characters.");
        }
    }
}

var Namespaces = {};
Namespaces.create = _u.bind(create, Namespaces);
Namespaces.createSync = _u.bind(create, Namespaces);
Namespaces.remove = _u.bind(remove, Namespaces);

module.exports =  Namespaces;