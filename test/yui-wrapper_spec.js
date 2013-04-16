var grunt = require('grunt');
var should = require('should');

describe('YUI Wrapper', function() {
    it('should wrap the compiled template into the YUI module', function() {
        var yuiModule = grunt.file.read('test/tmp/yuimodule.js');
        var expectedModule = grunt.file.read('test/expected/example_yuimodule.js');

        yuiModule.should.equal(expectedModule);
    });
});