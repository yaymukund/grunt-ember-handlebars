# grunt-ember-handlebars 

Precompile ember templates in grunt using only ember-template-compiler.js.

### [Updating Guide](https://github.com/yaymukund/grunt-ember-handlebars/wiki/Updating-Guide)

## Getting Started
If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a [gruntfile][Getting Started] as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```shell
npm install grunt-ember-handlebars --save-dev
```

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/wiki/Getting-started


## Handlebars task
_Run this task with the `grunt ember_handlebars` command._

_This task is a [multi task][] so any targets, files and options should be specified according to the [multi task][] documentation._
[multi task]: https://github.com/gruntjs/grunt/wiki/Configuring-tasks


_Version `0.3.x` of this plugin is compatible with Grunt `0.4.x`. Version `0.1.x` of this plugin is compatible with Grunt `0.3.x`._

### Options

#### separator
Type: `String`
Default: linefeed + linefeed

Concatenated files will be joined on this string.

#### namespace
Type: `String`
Default: 'Ember.TEMPLATES'

The namespace in which the precompiled templates will be assigned.  *Use dot notation (e.g. App.Templates) for nested namespaces.*

Example:
```js
options: {
  namespace: 'MyApp.Templates'
}
```

#### wrapped
Type: `Boolean`
Default: `true`

Determine if preprocessed template functions will be wrapped in Ember.Handlebars.template function.

#### processName
Type: `function`

This option accepts a function which takes one argument (the template filepath) and returns a string which will be used as the key for the precompiled template object.  The example below stores all templates on the default Ember.TEMPLATES namespace in capital letters.

```js
options: {
  processName: function(filename) {
    return filename.toUpperCase();
  }
}
```

#### processPartialName
Type: ```function```

This option accepts a function which takes one argument (the partial filepath) and returns a string which will be used as the key for the precompiled partial object when it is registered in Handlebars.partials. The example below stores all partials using only the actual filename instead of the full path.

```js
options: {
  processPartialName: function(filePath) { // input:  templates/_header.hbs
    var pieces = filePath.split("/");
    return pieces[pieces.length - 1]; // output: _header.hbs
  }
}
````

Note: If processPartialName is not provided as an option the default assumes that partials will be stored by stripping trailing underscore characters and filename extensions. For example, the path *templates/_header.hbs* will become *header* and can be referenced in other templates as *{{> header}}*.

#### partialRegex
Type: `Regexp`
Default: /^_/

This option accepts a regex that defines the prefix character that is used to identify Handlebars partial files.

``` javascript
// assumes partial files would be prefixed with "par_" ie: "par_header.hbs"
options: {
  partialRegex: /^par_/
}
```

### Usage Examples

```js
ember_handlebars: {
  compile: {
    options: {
      namespace: "MyApp.TEMPLATES"
    },
    files: {
      "path/to/result.js": "path/to/source.hbs",
      "path/to/another.js": ["path/to/sources/*.hbs", "path/to/more/*.hbs"]
    }
  }
}
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding
style.

## Release History

* v0.7.0 - Update Handlebars to v1.0.0. Don't strip leading underscores from
           partial names.
* v0.6.0 - Use ember-template-precompiler, update Handlebars to 1.0.0-rc.4.
* v0.5.0 - Drop support for registerPartial in favor of Ember.TEMPLATES.
* v0.4.0 - Now requires handlebars-1.0-rc.3 and ember-1.0.0-rc.1.
* v0.3.0 - Copy the grunt-contrib interface, which is much nicer.
* v0.2.1 - Change utils to util. D'oh!
* v0.2.0 - Make ember-handlebars use grunt 0.4.x.
* v0.1.7 - Updated ember.js used for testing, ensure that tests continue
           working with new view context handling.
* v0.1.6 - Stopped using helpers, which will get removed in grunt 0.4.
* v0.1.4 - Updated ember.js library we're using, since it looks like
           precompilation has been updated.
* v0.1.0 - Woo!

## License
Copyright (c) 2012 Mukund Lakshman

Licensed under the MIT license.
