var fs = require('fs');
var async = require('async');
var _u = require('underscore');
var winston = require('winston');

var Namespace = function(name, associatedDir) {
    this.name = name;
}

Namespace.prototype.importAllFilesInDirectory = function(associatedDir) {
    this.lazilyExportAllFiles(associatedDir);
}

Namespace.prototype.lazilyExportAllFiles = function(associatedDir) {
    var files = fs.readdirSync(associatedDir);
    this.processFiles(files, associatedDir);
}

Namespace.prototype.processFiles = function(files, associatedDir) {
    if (!files)
    {
        winston.info("No files in directory for namespace.")
        return;
    }

    for(var i = 0; i < files.length; i++) {
        this.processFile(files[i], associatedDir);
    }
};

Namespace.prototype.processFile = function(file, associatedDir) {
    this.recursivelyExportFile(file, associatedDir);
};

Namespace.prototype.useToExtend = function(toExtend) {
    _u.extend(toExtend, this);
};

Namespace.prototype.recursivelyExportFile = function(file, parentDirectory) {
    var fullPathToFile = parentDirectory + file;

    var fileStats = fs.statSync(fullPathToFile);

    if (fileStats.isDirectory())
    {
        this.lazilyExportAllFiles(fullPathToFile + "/")
    }
    else
    {
        this.lazilyExportFile(file, fullPathToFile);
    }
};

Namespace.prototype.lazilyExportFile = function(file, fullPathToFile) {
    var fileNameMinusExtension = file.substr(0, file.lastIndexOf('.'));

    //winston.info("Registering " + fileNameMinusExtension);

    // Wrap it in a function so we only require when the client actually asks for the dependency.
    this[fileNameMinusExtension] = function () {
        var required = require(fullPathToFile);
        return required;
    };
};

Namespace.prototype.require = function(dependency) {
    //winston.info("Require: " + dependency);
    var toReturn = this[dependency]();
    return toReturn;
}

module.exports = Namespace;