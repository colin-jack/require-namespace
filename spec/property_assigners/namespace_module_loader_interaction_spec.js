var assert = require('chai').assert;
var sinon = require('sinon');

var Namespace = require('../../lib/Namespace');

describe('Namespace - module loading', function () {
    var namespace;
    var fakepropertyAssigner;
    
    beforeEach(function () {
        fakepropertyAssigner = { assignProperty: function () { } };
    });
    
    beforeEach(function () {
        fakepropertyAssigner.assignProperty = sinon.spy(fakepropertyAssigner, "assignProperty");
        
        namespace = new Namespace("the_namespace", fakepropertyAssigner);
        namespace.lazilyExportFile("theDependency", "theDependency.js");
    });
    
    describe('when namespace property is used to load dependency', function () {
        beforeEach(function () {
            namespace.theDependency;
        });
        
        it('should use property assigner', function () {
            assert.isTrue(fakepropertyAssigner.assignProperty.calledOnce);
        });
    });

    describe('when namespace property is used to load dependency', function () {
        beforeEach(function () {
            namespace.require("theDependency");
        });
        
        it('should use property assigner', function () {
            assert.isTrue(fakepropertyAssigner.assignProperty.calledOnce);
        });
    });
});