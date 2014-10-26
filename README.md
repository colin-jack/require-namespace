## require-namespace
When you require modules in node.js you include the path to the file which means that moving files break dependent modules. 

To avoid that issue the new notion of a namespace allows you to require a dependency in a way that is more loosely coupled to the directory structure on disk.

## Installation
    $ npm install require-namespace

### Usage
During initialisation you synchronously create a namespace and associate it with a directory:
```js
global.domain = namespace.createSync(__dirname + '/domain/')
```
At this point the directory is recursively scanned and a record of each file is kept. Since we saved the namespace to a global variable we can then require files from it like this:
```js
var linkProcessor = domain.LinkContentProcessor
```
That require will work if there was a file called 'LinkContentProcessor' anywhere within the directory we used when creating the namespace. 

If we don't want to use a global variable for the namespace then requiring becomes a bit more wordy:
```js
var domain = require('require-namespace')('domain')
var linkProcessor = domain.LinkContentProcessor
```
## Example
The project comes with an example that you can run using

    node examples/simple.js

## Tests
The tests use [mocha](hhttp://mochajs.org/) and can be run using:

    mocha spec/requiringSimple_test