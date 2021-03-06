var fs = require('fs');
var _u = require('underscore');
var winston = require('winston');

var Namespace = function (name, moduleLoader) {
    if (name) this.name = name;

    this.moduleLoader = moduleLoader;
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
    
    var requireModule = function requireModule() {
        return this.moduleLoader.load(file, fullPathToFile);
    }
    
    Object.defineProperty(this, fileNameMinusExtension, { get: requireModule });
};

Namespace.prototype.require = function(dependency) {
    return this[dependency];
}

module.exports = Namespace;