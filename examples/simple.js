var namespace = require('./../index'),
    log = require('util').log;

namespace.createSync(__dirname + '/domain', 'domain')
var domain = namespace("domain");

global.domain = domain;

var theCombiner = domain.combiner;

log(theCombiner());