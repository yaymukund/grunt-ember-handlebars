var should = require('should'),
    grunt = require('grunt'),
    jsdom = require('jsdom'),
    precompiler = require('../lib/precompiler');

describe('A compiled template', function() {
  var exampleView, renderedView;

  before(function(done) {
    var vendorDir      = __dirname + '/vendor',
        jQueryJs       = grunt.file.read(vendorDir + '/jquery-2.0.3.js', 'utf8'),
        handlebarsJs   = grunt.file.read(vendorDir + '/handlebars-1.0.0.js', 'utf8'),
        emberJs        = grunt.file.read(vendorDir + '/ember.js', 'utf8'),
        exampleFile    = grunt.file.read('test/example.handlebars'),
        compiledSrc    = precompiler.precompile(exampleFile),
        templatedSrc   = 'Ember.TEMPLATES.example = '+
                         'Ember.Handlebars.template('+compiledSrc+');';

    jsdom.env({
      html: '<div id="test"></div>',
      src: [
        jQueryJs,
        handlebarsJs,
        emberJs,
        templatedSrc
      ],

      done: function(errors, window) {
        var $ = window.jQuery,
            Ember = window.Ember;

        // Required for templateForName, so Ember can find the template.
        Ember.Application.create();

        var ExampleView = Ember.View.extend({
          templateName: 'example'
        });

        exampleView = ExampleView.create({
          value: 'baz',

          context: Ember.Object.create({
            subcontext: Ember.Object.create({
              value: 'foo'
            }),

            value: 'bar'
          })
        });

        Ember.run(function() {
          exampleView.appendTo('#test');
        });

        renderedView = $('#test').text();
        done();
      }
    });
  });

  it('renders view values', function() {
    renderedView.should.include(exampleView.get('value'));
  });

  it('renders context values', function() {
    renderedView.should.include(exampleView.get('context.value'));
  });

  it('renders subcontexts values', function() {
    renderedView.should.include(exampleView.get('context.subcontext.value'));
  });
});
