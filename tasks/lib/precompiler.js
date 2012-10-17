var vm = require('vm'),
    fs = require('fs'),
    path = require('path'),
    vendorDir = __dirname + '/../../vendor',
    headlessEmber = fs.readFileSync(vendorDir + '/headless-ember.js', 'utf8'),
    emberJs = fs.readFileSync(vendorDir + '/ember.js', 'utf8');

exports.precompile = function(file) {
    // Create a context with the file.
    var context = vm.createContext({
      template: fs.readFileSync(file, 'utf8')
    });

    // Load ember, headless-ly.
    vm.runInContext(headlessEmber, context, 'headless-ember.js');
    vm.runInContext(emberJs, context, 'ember.js');

    // Compile the file inside the context.
    vm.runInContext('tJs = precompileEmberHandlebars(template);', context);

    // Generate code for our new js file.
    var templateName = path.basename(file).replace(/\.hbs|\.handlebars/, ''),
        src = 'Ember.TEMPLATES["' + templateName + '"] = ' +
              'Ember.Handlebars.template(' + context.tJs + ');';

    return {
      filename: templateName + '.js',
      src: src
    };
};
