var assert = require('chai').assert;
var underTest = require('../index');

describe('creating namespace', function () {
    var ExpectedNoDirectoryNameSpecifiedMessage = /You must provide the directory path to scan/;

    describe("invalid directory path provided", function () {
        var validFakeExpressInstance = { use: function () { } };
        
        describe("when given null directory", function () {
            it("should raise an exception", function () {
                assert.throw(function () {
                    underTest.createSync(null, "name1")
                }, ExpectedNoDirectoryNameSpecifiedMessage)
            })
        });
        
        describe("when given undefined directory", function () {
            it("should raise an exception", function () {
                assert.throws(function () {
                    underTest.createSync(undefined, "name2")
                }, ExpectedNoDirectoryNameSpecifiedMessage)
            })
        });
        
        describe("when given non-string directory", function () {
            it("should raise an exception", function () {
                assert.throws(function () {
                    underTest.createSync(5, "name3")
                }, ExpectedNoDirectoryNameSpecifiedMessage)
            })
        });
        
        describe("when given empty directory", function () {
            it("should raise an exception", function () {
                assert.throws(function () {
                    underTest.createSync("", "name4")
                }, ExpectedNoDirectoryNameSpecifiedMessage)
            })
        });
        
        describe("when given directory path is to non-existent directory", function () {
            it("should raise an exception", function () {
                assert.throws(function () {
                    underTest.createSync("c:\\foo\\bar\\this\\is\\not\\going\\to\\exist", "name6")
                }, "The specified directory does not exist c:\\foo\\bar\\this\\is\\not\\going\\to\\exist")
            })
        });
    });
});