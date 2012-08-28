# grunt-ember-handlebars

Precompile ember templates in grunt using only headless-ember.js and ember.js.

## Installation
1. Install this grunt plugin next to your project's
[grunt.js gruntfile](https://github.com/cowboy/grunt/blob/master/docs/getting_started.md)
with: `npm install grunt-ember-handlebars`

2. Then add this line to your project's `grunt.js` gruntfile:
  ```javascript
  grunt.loadNpmTasks('grunt-ember-handlebars');
  ```

## Usage
In your gruntfile.js:

```javascript
grunt.initConfig({

  // Compile ember templates:
  ember_handlebars: {
    all: {
      // In practice, this could be:
      // src: ['templates/**/*.hbs', 'templates/**/*.handlebars']
      src: ['templates/main.hbs', 'templates/post.handlebars'],
      dest: 'templates/compiled'
    }
  },

  // Include the templates in your app:
  concat: {
    all: {
      src: ['templates/compiled/*.js', 'app.js'],
      dest: 'public/myapp.js'
    }
  }

});

// Load the plugin. This assumes you have installed it via NPM.
grunt.loadNpmTasks('grunt-ember-handlebars');
grunt.registerTask('default', ['ember_handlebars', 'concat']);
```

Run the task using `grunt`, and grunt-ember-handlebars will compile and include
the templates using
[Ember.TEMPLATES](http://docs.emberjs.com/symbols/Ember.html#method=.TEMPLATES).
Now, just use them in your views:

```javascript
App.MainView = Em.View.extend({
  templateName: 'main'
});

App.PostView = Em.View.extend({
  templateName: 'post'
});
// etc.
```

That's it!

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding
style.
## Release History
v0.1 - Woo!

## License
Copyright (c) 2012 Mukund Lakshman

Licensed under the MIT license.
