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

var precompiler = require('./lib/precompiler'),
    path = require('path');

module.exports = function(grunt) {
  grunt.registerMultiTask('ember_handlebars', 'Precompile Ember Handlebars templates', function() {
    var files = grunt.file.expandFiles(this.file.src);
    grunt.utils._.each(files, function(file) {
      grunt.log.write('Precompiling "' + file + '" to "' + this.dest + '"');

      var compiled = precompiler.precompile(file);
          out = path.join(this.dest, compiled.filename);

      grunt.file.write(out, compiled.src, 'utf8');

    }, {dest: this.file.dest});
  });
};
