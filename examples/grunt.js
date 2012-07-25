module.exports = function(grunt) {
  grunt.initConfig({

    // 1. Compile all files under templates/**/*.hbs|handlebars to a
    //    'templates/compiled' directory.
    ember_handlebars: {
      all: {
        src: ['templates/**/*.hbs', 'templates/**/*.handlebars'],
        dest: 'templates/compiled'
      }
    }

    // 2. Concatenate the compiled files, app.js, and write the final package to
    //    public/myapp.js
    concat: {
      all: {
        src: ['templates/compiled/*.js', 'app.js'],
        dest: 'public/myapp.js'
      }
    }
  });

  // For this to work, you need to have `npm install grunt-ember-handlebars`
  grunt.loadNpmTasks('grunt-ember-handlebars');

  grunt.registerTask('default', ['ember_handlebars', 'concat']);
};
