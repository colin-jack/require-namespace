var assert = require('chai').assert;
var underTest = require('../index');

describe('creating namespace', function () {
    describe("when name matches existing namespace", function () {
        it("should raise an exception", function () {
            assert.throws(function () {
                underTest.createSync(__dirname + "/files/single_file_directory/", "name1");
                underTest.createSync(__dirname + "/files/empty_directory/", "name1");
            }, /You cannot create another namespace with the name 'name1'./)
        })
    });
});