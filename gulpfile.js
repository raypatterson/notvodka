var pkg = require('./package');
var del = require('del');
var path = require('path');
var open = require('open');
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var webpack = require('gulp-webpack');
var autoprefixer = require('autoprefixer-core');
var runSequence = require('run-sequence');

gulp.task('default', ['clean', 'nodemon'], function(cb) {
  open('http://localhost:8000', 'google chrome');
  cb();
});

gulp.task('build', function(cb) {
  runSequence(['webpack'], cb);
});

gulp.task('clean', function(cb) {
  del(['public/js'], cb);
});

gulp.task('nodemon', function(cb) {
  nodemon({
    script: 'bin/www',
    ext: 'js jsx html ejs scss',
    ignore: ['public/**', 'node_modules/']
  })
    .on('start', function() {
      runSequence(['webpack'], cb);
    });
});

gulp.task('webpack', function(cb) {
  gulp.src(['app/*.jsx', 'app/sass/*'])
    .pipe(webpack({
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
      }
    }))
    .pipe(gulp.dest('public/'))
    .on('end', function() {
      cb();
    });
});