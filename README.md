## Node.js Namespaces

NOTE - This project is a very early alpha.

During initialisation you synchronously create a namespace and associate it with a directory. The creation is currently purely synchronous because it is done as part of system startup and this approach simplifies the code. 

To create a namespace you thus do this as part of the system startup:

```js
var domain = namespace.createSync('domain', __dirname + '/server/javascript/domain/')
```

At this point the directory is recursively scanned and a record of each file is kept. Anywhere that you want to require modules from the namespace you do the following:

```js
var domain = require('require-namespace')('domain')
var TwitterConfigFactory = domain.require('TwitterConfigFactory')
```

In this last snippet of code we first get the domain namespace and then use it to require 'TwitterConfigFactory'. Its only when we ask for 'TwitterConfigFactory' that file with that same name is required. 

Among the advantages of this approach is it means the code that requires a dependency is more loosely coupled to the directory structure on disk, moving TwitterConfigFactory wouldn't break any code that requires it.

## Examples
Directory structure:

```
domain
  authentication
    user.js
    twitter
      twitterAuthentication.js
```

Creating the namespace and then resolving dependencies from it:

```js
var domain = namespace.createSync('domain', __dirname + '/server/javascript/domain/');
var twitterAuthentication = domain.require('twitterAuthentication'); // NOTE - Doesn't matter that it was in a sub-directory
var twitterAuthentication = domain.require('user');
```