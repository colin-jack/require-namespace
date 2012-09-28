var fs = require('fs');
var async = require('async');
var _u = require('underscore');
var winston = require('winston');

var Namespace = function(name, associatedDir) {
    this.name = name;
}

Namespace.prototype.importAllFilesInDirectory = function(associatedDir, done) {
    var that = this;

    var callback = function() {
        if (done) {
            done(null, that);
        }
    };

    this._importAllFiles(associatedDir, callback);
}

Namespace.prototype._importAllFiles = function(associatedDir, done) {
    var that = this;
    var allDone = done;

    var processFile = function(file, done) {
        that.recursivelyExportFile(file, associatedDir, done);
    };

    var processFiles = function(err, files) {
        if (!files)
        {
            winston.info("No files in directory for namespace.")
            return;
        }

        async.forEach(files, processFile, allDone);
    }

    fs.readdir(associatedDir, processFiles);
}

Namespace.prototype.useToExtend = function(toExtend) {
    _u.extend(toExtend, this);
};

Namespace.prototype.recursivelyExportFile = function(file, parentDirectory, done) {
    var that = this;
    var fullPathToFile = parentDirectory + file;

    fs.stat(fullPathToFile, function(err, fileStats) {
        if (fileStats.isDirectory())
        {
            that._importAllFiles(fullPathToFile + "/", done)
        }
        else
        {
            that.lazilyExportFile(file, fullPathToFile, done);
        }
    });
};

Namespace.prototype.lazilyExportFile = function(file, fullPathToFile, done) {
    var fileNameMinusExtension = file.substr(0, file.lastIndexOf('.'));

    winston.info("Registering " + fileNameMinusExtension);

    // Wrap it in a function so we only require when the client actually asks for the dependency.
    this[fileNameMinusExtension] = function () {
        var required = require(fullPathToFile);
        return required;
    };

    done();
};

Namespace.prototype.require = function(dependency) {
    winston.info("Require: " + dependency);
    var toReturn = this[dependency]();
    return toReturn;
}

module.exports = Namespace;