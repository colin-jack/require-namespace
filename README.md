## Node.js Namespaces

During initialisation you create a namespace and associate it with a directory:

```js
namespace.create('domain', __dirname + '/server/javascript/domain/', done)
```

At this point the directory is recursively scanned and a record of each file is kept. Anywhere that you want to require modules from the namespace you can do so simply:

```js
var domain = require('namespace')('domain')
var TwitterConfigFactory = domain.require('TwitterConfigFactory')
```

In this last snippet of code we first get the domain namespace and then use it to require 'TwitterConfigFactory'. Its only when we ask for 'TwitterConfigFactory' that file with that same name is required. 

## Examples
Directory structure

```
domain
  authentication
    user.js
    twitter
      twitterAuthentication.js
```

```js
namespace.create('domain', __dirname + '/server/javascript/domain/', done)
domain = require('namespace')('domain')
var twitterAuthentication = domain.require('twitterAuthentication') // NOTE - Doesn't matter that it was in a sub-directory
var twitterAuthentication = domain.require('user')
```
