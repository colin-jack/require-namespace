var requireModule = function (file, fullPathToFile) {
    var required = require(fullPathToFile);
    return required;
}

var DefaultModuleLoader = {
    loadModule: requireModule
}

module.exports = DefaultModuleLoader;