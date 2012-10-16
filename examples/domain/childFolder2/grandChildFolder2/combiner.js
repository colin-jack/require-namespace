var first = domain.require('firstDependency'),
    second = domain.require('secondDependency');
    

module.exports = function() {
    return first() + ", " + second();
}