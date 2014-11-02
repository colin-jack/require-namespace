var assignProperty = function (moduleName, fullPathToFile, namespace) {
    //winston.info("Registering " + fileNameMinusExtension);
    
    var requireModule = function requireModule() {
        var required = require(fullPathToFile);
        return required;
    }
    
    Object.defineProperty(namespace, moduleName, { get: requireModule });
}

module.exports = {
    assignProperty: assignProperty
};