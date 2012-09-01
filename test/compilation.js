var should = require('should');
var grunt = require('grunt');

// In case the grunt being used to test is different than the grunt being
// tested, initialize the task and config subsystems.
if (grunt.task.searchDirs.length === 0) {
  grunt.task.init([]);
  grunt.config.init({});
}

describe('precompile_handlebars', function() {
  var compiled;
  before(function() {
    compiled = grunt.helper('precompile_handlebars', 'test/a.handlebars');
  });

  it('has the correct filename', function() {
    compiled.filename.should.eql('a.js');
  });

  it('adds a handlebars template to Ember\'s templates', function() {
    compiled.src.should.match(/^Ember\.TEMPLATES\[".+"\] = Ember\.Handlebars.template\([\s\S]+\);$/);
  });
});
