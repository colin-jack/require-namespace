var _u = require('underscore');
var async = require('async');
var winston = require('winston');
var Namespace = require('./Namespace');

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