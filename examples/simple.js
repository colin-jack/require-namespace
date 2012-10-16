var namespace = require('./../index'),
    log = require('util').log;

global.domain = namespace.createSync('domain', __dirname + '/domain/')
var combiner = domain.require('combiner')

log(combiner());