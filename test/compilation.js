var should = require('should');
var grunt = require('grunt');

var fs = require('fs');
var jsdom = require('jsdom');

// In case the grunt being used to test is different than the grunt being
// tested, initialize the task and config subsystems.
if (grunt.task.searchDirs.length === 0) {
  grunt.task.init([]);
  grunt.config.init({});
}

var exampleFile    = 'test/example.handlebars';

describe('precompile_handlebars', function() {
  var compiled;

  before(function() {
    compiled = grunt.helper('precompile_handlebars', exampleFile);
  });

  it('has the correct filename', function() {
    compiled.filename.should.eql('example.js');
  });

  it('adds a handlebars template to Ember\'s templates', function() {
    compiled.src.should.match(/^Ember\.TEMPLATES\[".+"\] = Ember\.Handlebars.template\([\s\S]+\);$/);
  });

  describe('a compiled template', function() {
    var renderedView;

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

          var myView = MyView.create({
            content: Ember.Object.create({
              stuff: 'code'
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

    it('renders correctly', function() {
      renderedView.should.include('Lots of code here.');
    });
  });
});
