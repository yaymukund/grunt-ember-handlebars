module.exports = function(grunt) {
  grunt.initConfig({
    // Tests
    mocha: {
      all: {
        src: 'test/compilation.js',
        options: {
          ui: 'bdd',
          reporter: 'tap'
        }
      }
    },

    updateVendor: {}
  });

  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadTasks('dev-tasks');
  grunt.loadTasks('tasks');

  // Default task.
  grunt.registerTask('default', 'mocha');
};
