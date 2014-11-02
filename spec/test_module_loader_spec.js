var assert = require('chai').assert;
var underTest = require('../index');

var ExpectedReturnValue = 'being returned by dependency';

describe('require all files in directory', function () {
    var namespace = undefined;
    
    describe('when requiring a simple hierarchy', function () {
        beforeEach(function () {
            underTest.remove('domain')
            namespace = underTest.createSync(__dirname + '/files/simple_hierarchy_namespace_global/', 'domain', Double);
        });
        
        it('should create a namespace object', function () {
            assert.isNotNull(namespace);
        });
        
        it('should have the available modules on the namespace', function () {
            assert.isNotNull(namespace.root);
        });
        
        it('we can require a module from the namespace', function () {
            var root = namespace.root;
            
            assert.equal(root(), ExpectedReturnValue);
        });
        
        it('should be possible to get the entire namespace by name', function () {
            assert.equal(underTest.domain.root, namespace.root);
        });
    });
});
