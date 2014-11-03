var testDoubles = {
};

var getterFor = function (moduleName, fullPathToFile, namespace) {
    return function requireModule() {
        if (testDoubles.hasOwnProperty(moduleName)) {
            return testDoubles[moduleName];
        }
        
        var required = require(fullPathToFile);
        return required;
    }
}

var setterFor = function (moduleName, namespace) {
    return function (testDouble) {
        testDoubles[moduleName] = testDouble
    };
}

var assignProperty = function (moduleName, fullPathToFile, namespace) {
    var getter = getterFor(moduleName, fullPathToFile, namespace);
    var setter = setterFor(moduleName, namespace);
    
    Object.defineProperty(namespace, moduleName, {
        get: getter,
        set: setter
    });
}

var removeTestDoubles = function () {
    testDoubles = {};
}

module.exports = {
    assignProperty: assignProperty,
    removeTestDoubles: removeTestDoubles
};