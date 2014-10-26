var namespace = require('../../../../index');
var combiners = namespace.combiners;

var first = combiners.firstDependency;
var second = combiners.secondDependency;
    

module.exports = function() {
    return first() + ", " + second();
}