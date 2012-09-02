module.exports = function(grunt) {

  var path = require('path'),
      Mocha = require('mocha');

  grunt.registerMultiTask('mocha', 'Run tests with mocha.', function() {

    var filepaths = grunt.file.expandFiles(this.file.src);
    grunt.file.clearRequireCache(filepaths);

    var paths = filepaths.map(path.resolve),
        options = this.data.options || {},
        mocha_instance = new Mocha(options);

    paths.map(mocha_instance.addFile.bind(mocha_instance));
    mocha_instance.run(this.async());

  });
};
