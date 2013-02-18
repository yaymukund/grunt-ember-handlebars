/*
 * grunt-ember-handlebars
 * https://github.com/yaymukund/grunt-ember-handlebars
 *
 * Copyright (c) 2012 Mukund Lakshman
 * Licensed under the MIT license.
 *
 * A grunt task that precompiles Ember.js Handlebars templates into separate
 * .js files. This script uses ember-template-compiler.js from the ember.js
 * repository:
 *
 *   https://github.com/emberjs/ember.js
 *
 * Run `rake` and you'll see the compiler in your dist directory.
 *
 * Much of this code owes its life to the grunt-contrib-handlebars repository:
 *
 *   https://github.com/gruntjs/grunt-contrib-handlebars
 *
 * Thanks, Tim Branyen and contributors to grunt-contrib!
 */

module.exports = function(grunt) {
  'use strict';

  var _ = grunt.util._;
  var helpers = require('grunt-lib-contrib').init(grunt);

  // filename conversion for templates
  var defaultProcessName = function(name) { return name; };

  // filename conversion for partials
  var defaultProcessPartialName = function(filePath) {
    var pieces = _.last(filePath.split('/')).split('.');
    var name   = _(pieces).without(_.last(pieces)).join('.'); // strips file extension
    return name.substr(1, name.length);                       // strips leading _ character
  };

  grunt.registerMultiTask('ember_handlebars', 'Precompile Ember Handlebars templates.', function() {
    var options = this.options({
      namespace: 'Ember.TEMPLATES',
      separator: grunt.util.linefeed + grunt.util.linefeed,
      wrapped: true
    });
    grunt.verbose.writeflags(options, 'Options');

    var nsInfo = helpers.getNamespaceDeclaration(options.namespace);

    // assign regex for partial detection
    var isPartial = options.partialRegex || /^_/;

    // assign filename transformation functions
    var processName = options.processName || defaultProcessName;
    var processPartialName = options.processPartialName || defaultProcessPartialName;

    this.files.forEach(function(f) {
      var partials = [];
      var templates = [];

      // iterate files, processing partials and templates separately
      f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      })
      .forEach(function(filepath) {
        var src = grunt.file.read(filepath);
        var compiled, filename;
        try {
          compiled = require('./lib/ember-template-compiler').precompile(src);
          // if configured to, wrap template in Handlebars.template call
          if (options.wrapped) {
            compiled = 'Ember.Handlebars.template('+compiled+')';
          }
        } catch (e) {
          grunt.log.error(e);
          grunt.fail.warn('Handlebars failed to compile '+filepath+'.');
        }

        // register partial or add template to namespace
        if (isPartial.test(_.last(filepath.split('/')))) {
          filename = processPartialName(filepath);
          partials.push('Ember.Handlebars.registerPartial('+JSON.stringify(filename)+', '+compiled+');');
        } else {
          filename = processName(filepath);
          templates.push(nsInfo.namespace+'['+JSON.stringify(filename)+'] = '+compiled+';');
        }
      });

      var output = partials.concat(templates);
      if (output.length < 1) {
        grunt.log.warn('Destination not written because compiled files were empty.');
      } else {
        output.unshift(nsInfo.declaration);
        grunt.file.write(f.dest, output.join(grunt.util.normalizelf(options.separator)));
        grunt.log.writeln('File "' + f.dest + '" created.');
      }
    });

  });

};
