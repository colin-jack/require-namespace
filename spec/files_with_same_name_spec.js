var assert = require('chai').assert;
var underTest = require('../index');

describe('require all files in directory', function () {
    describe('when requiring from directory containing two files with same name', function () {
        var createNamespace = function () {
            underTest.createSync(__dirname + '/files/files_with_same_name/', 'name10');
        };

        it('should fail to create namespace', function () {
            assert.throws(createNamespace);
        });
    });
});
