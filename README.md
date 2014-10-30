## require-namespace
When you require modules in node.js you include the path to the file, this can result in messy "../../" paths at the top of your files but can also mean that moving/renaming files break dependent modules. 

To avoid that issue the new notion of a namespace allows you to require a dependency in a way that is more loosely coupled to the directory structure on disk.

## Installation
    $ npm install require-namespace

### Usage
During initialisation of the system you create a namespace and associate it with a directory:
```js
var namespace = require('require-namespace');
namespace.createSync(__dirname + '/model/', 'domain');
```
The first argument is the path to a directory containing JS modules that you want to include in the namespace, the second argument is the name of the namespace. Giving the namepace a name is optional but useful (see below).

At this point the directory is recursively scanned and a record of each file is kept. Once this is done we can access the modules from the namespace:
```js
var namespace = require('require-namespace');
var domain = namespace.domain;
var linkProcessor = domain.LinkContentProcessor;
```
That require will work if there was a file called 'LinkContentProcessor.js' anywhere within the directory we used when creating the namespace. 

Note also that the '''createSync''' method returns the created namespace and that if you prefer you can use '''domain.require("LinkContentProcessor")''' rather than '''domain.LinkContentProcessor'''.

## Example
The project comes with an example that you can run using

    node examples/simple.js

## Tests
The tests use [mocha](hhttp://mochajs.org/) and can be run using:

    mocha -R spec spec/**/*_spec.js --recursive