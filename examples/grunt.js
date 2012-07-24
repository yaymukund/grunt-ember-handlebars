// This grunt task will compile all .hbs files under templates/**/*.hbs to a
// templates/compiled/' directory.
//
// I usually have a separate concat task run afterwards to bundle up the
// templates into one file.
module.exports = function(grunt) {
  grunt.initConfig({

    // Compile ember templates.
    ember_handlebars: {
      all: {
        src: ['templates/**/*.hbs', 'templates/**/*.handlebars'],
        dest: 'templates/compiled'
      }
    }

    // Include the templates in your app:
    concat: {
      all: {
        src: ['templates/compiled/*.js', 'app.js'],
        dest: 'public/myapp.js'
      }
    }
  });

  // For this to work, you need to have `npm install grunt-ember-handlebars`
  grunt.loadNpmTasks('grunt-ember-handlebars');

  grunt.registerTask('default', 'ember_handlebars concat');
};
