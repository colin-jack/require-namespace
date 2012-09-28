var vows = require('vows'),
	assert = require('assert'),
    namespace = require('../index');

var correctReturnValue = 'being returned by dependency';

vows.describe('require all files in directory').addBatch({
    'when requiring a simple hierarchy': {
        topic: function () { 
            return namespace.createSync('domain', __dirname + '/files/simple_hierarchy_namespace_global/'); 
        },
        'we can require a module with dependencies based on a namespace in a global object': function (namespace) {
            debugger;
            var root = namespace.require('root');

            assert.equal (root(), correctReturnValue);
        },

    }
}).export(module);


vows.describe('require all files in directory').addBatch({
    'when requiring a simple hierarchy': {
        topic: function () { 
            return namespace.createSync('domain', __dirname + '/files/simple_hierarchy/'); 
        },
        'we can require a module with dependencies': function (namespace) {
            var root = namespace.require('root');

            assert.equal (root(), correctReturnValue);
        },
        'we can access the module directly on the namespace': function (namespace) {
            var root = namespace.root();

            assert.equal (root(), correctReturnValue);
        },
        'we can access an exported object directly': function(namespace) {
            var exported = namespace.require('exporting_object');
            assert.equal(exported.getConstantValue(), 89);
        }
    }
}).export(module);

// TODO: No "/" at end of path.
// TODO: Invalid path.
// TODO: Multiple files with same name.
// TODO: Directory does not exist.
// TODO: Ignore casing
// TODO: Example
// TODO: No files in directory
// TODO: useToExtend
// TODO: Export is for a function
// TODO: Pass in no callback