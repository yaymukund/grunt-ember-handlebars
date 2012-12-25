var should = require('should'),
    grunt = require('grunt'),
    fs = require('fs'),
    jsdom = require('jsdom'),
    precompiler = require('../tasks/lib/precompiler');

var exampleFile    = 'test/example.handlebars';

describe('precompile_handlebars', function() {
  var compiled;

  before(function() {
    compiled = precompiler.precompile(exampleFile);
  });

  it('has the correct filename', function() {
    compiled.filename.should.eql('example.js');
  });

  it('adds a handlebars template to Ember\'s templates', function() {
    compiled.src.should.match(/^Ember\.TEMPLATES\[".+"\] = Ember\.Handlebars.template\([\s\S]+\);$/);
  });

  describe('a compiled template', function() {
    var myView, renderedView;

    before(function(done) {
      var vendorDir      = __dirname + '/vendor',
          jQueryJs       = fs.readFileSync(vendorDir + '/jquery-1.7.2.js', 'utf8'),
          handlebarsJs   = fs.readFileSync(vendorDir + '/handlebars-1.0.rc.1.js'),
          emberJs        = fs.readFileSync(vendorDir + '/ember.js', 'utf8');

      jsdom.env({
        html: '<div id="test"></div>',
        src: [
          jQueryJs,
          handlebarsJs,
          emberJs,
          compiled.src
        ],

        done: function(errors, window) {
          var $ = window.jQuery,
              Ember = window.Ember;

          var MyView = Ember.View.extend({
            templateName: 'example'
          });

          myView = MyView.create({
            value: 'baz',

            context: Ember.Object.create({
              subcontext: Ember.Object.create({ value: 'foo' }),
              value: 'bar'
            })
          });

          Ember.run(function() {
            myView.appendTo('#test');
          });

          renderedView = $('#test').text();
          done();
        }
      });
    });

    it('renders view values', function() {
      renderedView.should.include(myView.get('value'));
    });

    it('renders context values', function() {
      renderedView.should.include(myView.get('context.value'));
    });

    it('renders subcontexts values', function() {
      renderedView.should.include(myView.get('context.subcontext.value'));
    });
  });
});
