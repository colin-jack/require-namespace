var assert = require('chai').assert;
var underTest = require('../../index');

describe('creating namespace', function () {
    var InvalidRequireMessage = "If provided the module loader must be an object with a method 'assignProperty'.";

    describe('when specified module loader has no require property', function () {
        it("should raise an exception", function () {
            assert.throws(function () {
                underTest.createSync(__dirname + "/../files/single_file_directory/", "name5", {});
            }, InvalidRequireMessage);
        })
    });

    describe('when specified module loader has a require property that is not a function', function () {
        it("should raise an exception", function () {
            assert.throws(function () {
                underTest.createSync(__dirname + "/../files/single_file_directory/", "name5", { assignProperty: {} });
            }, InvalidRequireMessage);
        })
    });
});