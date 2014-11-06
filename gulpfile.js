var pkg = require('./package');
var del = require('del');
var path = require('path');
var open = require('open');
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var webpack = require('gulp-webpack');
var autoprefixer = require('autoprefixer-core');
var runSequence = require('run-sequence');

gulp.task('default', function() {
  runSequence('clean', 'nodemon', 'webpack', 'open');
});

gulp.task('open', function() {
  open('http://localhost:8000', 'google chrome');
});

gulp.task('clean', function(cb) {
  del(['public/js'], cb);
});

gulp.task('nodemon', function() {
  return nodemon({
      script: 'bin/www',
      ext: 'js jsx html ejs scss',
      ignore: ['public/**', 'node_modules/']
    })
    .on('start', function() {
      console.log('START');
    });
});

gulp.task('webpack', function() {
  return gulp.src(['app/*.jsx', 'app/sass/*'])
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
    .pipe(gulp.dest('public/'));
});