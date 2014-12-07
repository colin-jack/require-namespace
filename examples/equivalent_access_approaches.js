// just shows the different ways of accessing things
var assert = require('chai').assert;

var namespaces = require('./../index');
var simpleNamespace = namespaces.createSync(__dirname + "/simple", "simple");

assert.equal(namespaces.simple, simpleNamespace);
assert.equal(simpleNamespace.require("foo"), simpleNamespace.foo);

