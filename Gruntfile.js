module.exports = function(grunt) {
  grunt.initConfig({
	clean: {
	  test: ['test/tmp']
	},
	ember_handlebars: {
      compile: {
        options: {
		  yui: true,
	      namespace: 'App.Namespace'
        },
	      files: {
		    "test/tmp/yuimodule.js": "test/fixtures/example.handlebars"
	      }
      }
    },
    // Tests
    simplemocha: {
      options: {
        ui: 'bdd',
        reporter: 'tap'
      },

      all: { src: 'test/*.js' }
    }
  });

  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.loadTasks('tasks');

  // Default task.
  grunt.registerTask('default', ['clean', 'ember_handlebars', 'simplemocha']);
};
