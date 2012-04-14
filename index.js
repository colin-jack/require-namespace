var fs = require('fs');
var _u = require('underscore');
var async = require('async');
var winston = require('winston');

var Namespace = function(name, associatedDir, done) {
    this.associatedDir = associatedDir;
    this.name = name;
}

Namespace.prototype.exportAllFiles = function(done) {
    var that = this;

    var callback = function() {
        done(null, that);
    }

    this.lazilyExportAllFiles(this.associatedDir, callback);
}

Namespace.prototype.lazilyExportAllFiles = function(associatedDir, done) {
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

        async.forEach(files, processFile, function() {
            allDone();
        });
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
            that.lazilyExportAllFiles(fullPathToFile + "/", done)
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

module.exports = (function() {
    var namespaces = [];

    var registerNamespace = function(name, associatedDir, done) {
        try
        {
            var group = new Namespace(name, associatedDir);
            group.exportAllFiles(done);
            namespaces.push(group);
        }
        catch(ex)
        {
            winston.error('namespace: error registering: "' + ex + '"');
        }

        return group;
    };

    var getNamespace = function(groupName) {
        return _u.find(namespaces, function(group) {
            return group.name === groupName;
        });
    }

    getNamespace.create = registerNamespace;

    return getNamespace;
})();