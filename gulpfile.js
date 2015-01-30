var pkg = require('./package');
var cfg = require('./gulpfile.config');
var fs = require('fs-extra');
var del = require('del');
var path = require('path');
var open = require('open');
var gulp = require('gulp');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer-core');
var runSequence = require('run-sequence');

var $ = require('gulp-load-plugins')({
  camelize: true
});

gulp.task('default', function() {
  runSequence('clean', 'nodemon', 'webpack', 'livereload', 'open');
});

gulp.task('build', function() {
  runSequence('webpack', 'reload');
});

gulp.task('livereload', function() {
  $.livereload.listen();
});

gulp.task('reload', function() {
  $.livereload.changed();
});

gulp.task('open', function() {
  open('http://localhost:8000', 'google chrome');
});

gulp.task('clean', function(cb) {
  del(['public/js'], cb);
});

gulp.task('nodemon', function() {

  var isStarted = false;

  return $.nodemon({
      script: 'bin/www',
      ext: 'js jsx html ejs scss',
      ignore: ['public/**', 'node_modules/']
    })
    .on('start', function() {

      if (isStarted === false) {
        isStarted = true;
      } else {
        runSequence('build');
      }
    });
});

gulp.task('webpack', function() {

  var cfg = {
    resolve: {
      modulesDirectories: [
        'node_modules',
        'app'
      ]
    },
    module: {
      loaders: [{
        test: /\.jsx$/,
        loader: 'jsx'
      }, {
        test: /\.scss$/,
        loader: 'style!css!sass?outputStyle=expanded&includePaths[]=' + (path.resolve(__dirname, './public'))
      }]
    },
    postcss: {
      defaults: [autoprefixer],
    },
    output: {
      filename: 'js/bundle.js',
    },
    plugins: [
      new webpack.DefinePlugin({
        'CONFIG': JSON.stringify(cfg)
      }),
      new webpack.ProvidePlugin({
        Primus: 'primus'
      })
    ]
  };

  return gulp.src([
      'app/*.jsx'
    ])
    .pipe($.webpack(cfg, webpack))
    .pipe(gulp.dest('public/'));
});