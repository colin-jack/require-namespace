var assert = require('chai').assert;
var underTest = require('../lib/Namespace');
var sinon = require('sinon');

describe('module loading', function () {
    var namespace;
    var fakeModuleLoader = { require: function () { } };
    
    beforeEach(function () {
        fakeModuleLoader.require = sinon.spy(fakeModuleLoader, "require");
        
        namespace = new Namespace("the_namespace", fakeModuleLoader);
        namespace.lazilyExportFile("theDependency", "theDependency.js");
    });
    
    describe('when namespace property is used to load dependency', function () {
        beforeEach(function () {
            namespace.theDependency;
        });
        
        it('should use module loader', function () {
            assert.isTrue(fakeModuleLoader.require.calledOnce);
        });
    });

    describe('when namespace property is used to load dependency', function () {
        beforeEach(function () {
            namespace.require("theDependency");
        });
        
        it('should use module loader', function () {
            assert.isTrue(fakeModuleLoader.require.calledOnce);
        });
    });
});