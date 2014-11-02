var assert = require('chai').assert;
var underTest = require('../../index');

describe('index - test double module loader', function () {
    var namespace = undefined;
    var path = __dirname + '/../files/single_file_directory/';
    var testDoubleImplementation = { relevant: "yes" };
    
    beforeEach(function () {
        underTest.remove('domain');
    });
    
    var createNamespaceOverridingIrrelevant = function () {
        var domain = underTest.create(path, 'domain', underTest.AllowTestDoubles);
        
        domain.irrelevant = testDoubleImplementation;

        return domain;
    }
    
    describe('when we have created a namespace allowing module replacement and replace/shadow one of the modules', function () {
        beforeEach(function () {
            namespace = createNamespaceOverridingIrrelevant();
        });
        
        it('should get the replacement not the original content exported by the module', function () {
            assert.equal(namespace.irrelevant, testDoubleImplementation);
        });
    });

    describe('when we have created a namespace allowing module replacement and replace/shadow one of the modules but then remove all replacements', function () {
        beforeEach(function () {
            namespace = createNamespaceOverridingIrrelevant();
            
            debugger;
            namespace.removeTestDoubles();
        });
        
        it('should get the replacement not the original content exported by the module', function () {
            assert.notEqual(namespace.irrelevant, testDoubleImplementation);
        });
    });
});
