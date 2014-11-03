var assert = require('chai').assert;
var sinon = require('sinon');

var Namespace = require('../../lib/Namespace');

describe('Namespace - module loading', function () {
    var namespace;
    var fakemoduleLoader;
    
    beforeEach(function () {
        fakemoduleLoader = { load: function () { } };
    });
    
    beforeEach(function () {
        fakemoduleLoader.load = sinon.spy(fakemoduleLoader, "load");
        
        namespace = new Namespace("the_namespace", fakemoduleLoader);
        namespace.lazilyExportFile("theDependency.js", "c:\theDependency.js");
    });
    
    describe('when namespace property is used to load dependency', function () {
        beforeEach(function () {
            debugger;
            namespace.theDependency;
        });
        
        it('should use module loader', function () {
            assert.isTrue(fakemoduleLoader.load.calledOnce);
            assert.isTrue(fakemoduleLoader.load.calledWith("theDependency.js", "c:\theDependency.js"));
        });
    });

    describe('when require method is used to load dependency', function () {
        beforeEach(function () {
            namespace.require("theDependency");
        });
        
        it('should use module loader', function () {
            assert.isTrue(fakemoduleLoader.load.calledOnce);
            assert.isTrue(fakemoduleLoader.load.calledWith("theDependency.js", "c:\theDependency.js"));
        });
    });
});