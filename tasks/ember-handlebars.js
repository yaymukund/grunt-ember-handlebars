/*
 * grunt-ember-handlebars
 * https://github.com/yaymukund/grunt-ember-handlebars
 *
 * Copyright (c) 2012 Mukund Lakshman
 * Licensed under the MIT license.
 *
 * A grunt task that precompiles Ember.js Handlebars templates into
 * separate .js files of the same name. This script expects the
 * following setup:
 *
 * tasks/
 *   ember-templates.js
 *   lib/
 *     headless-ember.js
 *     ember.js
 *
 * headless-ember and ember.js can both be found in the main Ember repo:
 *   https://github.com/emberjs/ember.js/tree/master/lib
 */

module.exports = function(grunt) {
  var vm            = require('vm');
  var fs            = require('fs');
  var path          = require('path');

  var libPath       = __dirname + '/lib';
  var headlessEmber = fs.readFileSync(libPath + '/headless-ember.js', 'utf8');
  var emberJs       = fs.readFileSync(libPath + '/ember.js', 'utf8');

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('ember_handlebars', 'Precompile Ember Handlebars templates', function() {
    var files = grunt.file.expandFiles(this.file.src);
    grunt.utils._.each(files, function(file) {

      console.log('Precompiling "' + file + '" to "' + dest + '"');
      var compiled = grunt.helper('precompile_handlebars', file);

      var out = path.join(this.dest, compiled.filename);
      grunt.file.write(out, compiled.src, 'utf8');

    }, {dest: this.file.dest});
  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  grunt.registerHelper('precompile_handlebars', function(file) {

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
    var templateName = path.basename(file).replace(/\.hbs|\.handlebars/, '');
    var src = 'Ember.TEMPLATES["' + templateName + '"] = ' +
              'Ember.Handlebars.template(' + context.tJs + ');';

    return {
      filename: templateName + '.js',
      src: src
    };

  });
};
