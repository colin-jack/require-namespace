var assert = require('chai').assert;
var RegistersResources = lib.require('RegistersResources');

describe('RegistersResources', function () {
    describe("invalid directory path provided", function () {
        var validFakeExpressInstance = { use: function () { } };
        
        describe("when given null directory", function () {
            it("should raise an exception", function () {
                assert.throws(function () {
                    RegistersResources.registerAllInDirectory(null, validFakeExpressInstance)
                }, /You must provide the directory path to scan./)
            })
        });
        
        describe("when given undefined directory", function () {
            it("should raise an exception", function () {
                assert.throws(function () {
                    RegistersResources.registerAllInDirectory(undefined, validFakeExpressInstance)
                }, /You must provide the directory path to scan./)
            })
        });
        
        describe("when given non-string directory", function () {
            it("should raise an exception", function () {
                assert.throws(function () {
                    RegistersResources.registerAllInDirectory(5, validFakeExpressInstance)
                }, /You must provide the directory path to scan./)
            })
        });
        
        describe("when given empty directory", function () {
            it("should raise an exception", function () {
                assert.throws(function () {
                    RegistersResources.registerAllInDirectory("", validFakeExpressInstance)
                }, /You must provide the directory path to scan./)
            })
        });
        
        describe("when given directory path is to non-existent directory", function () {
            it("should raise an exception", function () {
                assert.throws(function () {
                    RegistersResources.registerAllInDirectory("c:\\foo\\bar\\this\\is\\not\\going\\to\\exist", validFakeExpressInstance)
                }, "The specified directory does not exist c:\\foo\\bar\\this\\is\\not\\going\\to\\exist")
            })
        });
    });
});