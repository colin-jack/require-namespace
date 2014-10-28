var assert = require('chai').assert;
var underTest = require('../index');

describe('require all files in directory', function () {
    var namespace = undefined;
    
    describe('when requiring from directory with other files', function () {
        beforeEach(function (done) {
            namespace = underTest.createSync(__dirname + '/files/with_inappropriate_files/');
            done();
        });
        
        it('should have a module for the JS file in the directory', function () {
            assert.isNotNull(namespace);
            assert.isNotNull(namespace.something);
            assert.equal(namespace.something.yes, "Indeed");
        });
    });
});