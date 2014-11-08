var load = function (moduleName, fullPathToFile) {
    var required = require(fullPathToFile);
    return required;
}

module.exports = {
    load: load
};