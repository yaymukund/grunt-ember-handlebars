var vm = require('vm'),
    fs = require('fs'),
    path = require('path'),
    vendorDir = __dirname + '/../../vendor',
    headlessEmber = fs.readFileSync(vendorDir + '/headless-ember.js', 'utf8'),
    emberJs = fs.readFileSync(vendorDir + '/ember.js', 'utf8');

exports.precompile = function(src) {
    // Create a context with the file.
    var context = vm.createContext({template: src});

    // Load ember, headless-ly.
    vm.runInContext(headlessEmber, context, 'headless-ember.js');
    vm.runInContext(emberJs, context, 'ember.js');

    // Compile the file inside the context.
    vm.runInContext('tJs = precompileEmberHandlebars(template);', context);

    return context.tJs;
};
