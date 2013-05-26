var vm = require('vm'),
    fs = require('fs'),
    context;

var createContext = function() {
  if (typeof context !== 'undefined') {
    return context;
  }

  var vendor = __dirname + '/vendor',
      handlebarsJs = fs.readFileSync(vendor+'/handlebars.js', 'utf8'),
      emberTemplateCompilerJs = fs.readFileSync(vendor+'/ember-template-compiler.js', 'utf8'),
      sandbox = {exports: {}};

  context = vm.createContext(sandbox);
  vm.runInContext(handlebarsJs, context, 'handlebars.js');
  vm.runInContext(emberTemplateCompilerJs, context, 'ember-template-compiler.js');

  return context;
};

exports.precompile = function(src) {
  createContext();
  context.src = src;
  var compileJs = 'compiledTemplate = exports.precompile(src);';
  vm.runInContext(compileJs, context, 'precompiler.js');
  return context.compiledTemplate;
};
