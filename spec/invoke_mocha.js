// NOTE - This file is useful when you want to debug the tests in Visual Studio.
var Mocha = require('mocha'),
    fs = require('fs'),
    path = require('path');

// First, you need to instantiate a Mocha instance.
var mocha = new Mocha({ timeout: 10000 });

var testDirectory = __dirname + "/creating_namespace";

// Here is an example:
fs.readdirSync(testDirectory).filter(function (file) {
    // Only keep the .js files
    return file.substr(-3) === '.js' && file.indexOf("invalid_name_spec") !== -1;

}).forEach(function (file) {
    // Use the method "addFile" to add the file to mocha
    mocha.addFile(path.join(testDirectory, file)
);
});

// Now, you can run the tests.
mocha.run(function (failures) {
    process.on('exit', function () {
        debugger;
        process.exit(failures);
    });
});