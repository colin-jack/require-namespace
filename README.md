## require-namespace
When you require modules in node.js you include the path to the file which means that moving files break dependent modules. 

To avoid that issue the new notion of a namespace allows you to require a dependency in a way that is more loosely coupled to the directory structure on disk.

## Installation
    $ npm install require-namespace

### Usage
During initialisation you synchronously create a namespace and associate it with a directory:
```js
var namespace = require('require-namespace');
namespace.createSync(__dirname + '/model/', 'domain')
```
The second argument provides the name of the namespace.

At this point the directory is recursively scanned and a record of each file is kept. Once this is done we can access the modules from the namespace:
```js
var domain = namespace.domain;
var linkProcessor = domain.LinkContentProcessor;
```
That require will work if there was a file called 'LinkContentProcessor.js' anywhere within the directory we used when creating the namespace. 

## Example
The project comes with an example that you can run using

    node examples/simple.js

## Tests
The tests use [mocha](hhttp://mochajs.org/) and can be run using:

    mocha -R spec "spec/**/*_spec.js" --recursive