var assert = require('chai').assert;
var underTest = require('../../index');

describe('creating namespace', function () {
    describe("when name matches existing namespace", function () {
        it("should raise an exception", function () {
            assert.throws(function () {
                underTest.createSync(__dirname + "/../files/single_file_directory/", "name1");
                debugger;
                underTest.createSync(__dirname + "/../files/empty_directory/", "name1");
            }, /You cannot create another namespace with the name 'name1'./)
        })
    });

    describe("when name is not a string", function () {
        it("should raise an exception", function () {
            assert.throws(function () {
                underTest.createSync(__dirname + "/../files/single_file_directory/", 5);
            }, /The namespace name should be a string which uniquely identifies that namespace./)
        })
    });
    
    describe("invalid characters", function () {
        var InvalidNameMessage = "The namespace name must be a string with only alpha numeric characters.";
        
        var createWithName = function (name) {
            debugger;
            
        };
        
        var assertThrowsFor = function (name) {
            try {
                underTest.createSync(__dirname + "/../files/single_file_directory/", name);
                assert.fail("Expected exception when namespace is given invalid name.")
            } catch (e) {
                assert.equal(e.message, InvalidNameMessage);
            }
        }
        
        describe("when name has a tab in it", function () {
            it("should raise an exception", assertThrowsFor("my domain"));
        });

        describe("when name has a space in it", function () {
            it("should raise an exception", assertThrowsFor("my     domain"));
        });

        describe("when name has a * character in it", function () {
            it("should raise an exception", assertThrowsFor("my*domain"));
        });

        describe("when name has an underscore in it", function () {
            it("should raise an exception", assertThrowsFor("domain_bob"));
        });
    });
});