var vows = require('vows'),
	assert = require('assert'),
    namespace = require('require-namespace'),
    log = require('util').log;

var correctReturnValue = 'being returned by dependency';

vows.describe('require all files in directory').addBatch({
    'when requiring a simple hierarchy': {
        topic: function () { 
            namespace.create('domain', __dirname + '/files/simple_hierarchy_namespace_global/', this.callback); 
        },
        'we can require a module with dependencies based on a namespace in a global object': function (err, namespace) {
            global.domain = namespace;
            var root = namespace.require('root');

            assert.equal (root(), correctReturnValue);
        },

    }
}).run();


vows.describe('require all files in directory').addBatch({
    'when requiring a simple hierarchy': {
        topic: function () { 
            namespace.create('domain', __dirname + '/files/simple_hierarchy/', this.callback); 
        },
        'we can require a module with dependencies': function (err, namespace) {
            var root = namespace.require('root');

            assert.equal (root(), correctReturnValue);
        },
    }
}).run();

// TODO: No "/" at end of path.
// TODO: Invalid path.
// TODO: Multiple files with same name.
// TOOD: Directory does not exist.