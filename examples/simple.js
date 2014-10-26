var namespace = require('./../index'),
    log = require('util').log;

// all files in the directory will be added to a namespace called combiners
namespace.createSync(__dirname + '/domain', 'combiners')

var combiners = namespace.combiners;

var theCombiner = combiners.combineFirstAndSecond;

log(theCombiner());