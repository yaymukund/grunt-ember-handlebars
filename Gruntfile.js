module.exports = function(grunt) {
  grunt.initConfig({
    // Tests
    simplemocha: {
      options: {
        ui: 'bdd',
        reporter: 'tap'
      },

      all: { src: 'test/compilation.js' }
    }
  });

  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadTasks('tasks');

  // Default task.
  grunt.registerTask('default', 'simplemocha');
};
