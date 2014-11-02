var assert = require('chai').assert;
var underTest = require('../index');

var ExpectedReturnValue = 'being returned by dependency';

describe('require all files in directory', function () {
    var namespace = undefined;
    
    describe('when requiring a simple hierarchy', function () {
        beforeEach(function (done) {
            underTest.remove('domain')
            namespace = underTest.createSync(__dirname + '/files/simple_hierarchy_namespace_global/', 'domain');
            done();
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

    describe('when requiring a simple hierarchy', function() {
        beforeEach(function (done) {
            underTest.remove('domain')
            namespace = underTest.createSync(__dirname + '/files/simple_hierarchy/', 'domain');
            done();
        });
        
        afterEach(function () {
            underTest.remove('domain')
        });

        it('we can require a module with dependencies', function () {
            var root = namespace.root;
            
            assert.equal(root(), ExpectedReturnValue);
        });
        
        it('we can access the module directly on the namespace', function () {
            var root = namespace.root;
            
            assert.equal(root(), ExpectedReturnValue);
        });
        
        it('we can access an exported object directly', function () {
            var exported = namespace.exporting_object;
            assert.equal(exported.getConstantValue(), 89);
        });
    });

    describe('when requiring a simple hierarchy but omit / at end of directory and name', function () {
        beforeEach(function (done) {
            namespace = underTest.createSync(__dirname + '/files/simple_hierarchy');
            done();
        });
        
        it('we can require a module with dependencies', function () {
            var root = namespace.root;
            
            assert.equal(root(), ExpectedReturnValue);
        });
        
        it('should have no name', function () {
            assert.isUndefined(namespace.name);
        });
    });
});


// TODO: Ignore casing
// TODO: Example
// TODO: No files in directory
// TODO: useToExtend
// TODO: Export is for a function
// TODO: Pass in no callback