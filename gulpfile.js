var pkg = require('./package');
var del = require('del');
var path = require('path');
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var webpack = require('gulp-webpack');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var autoprefixer = require('autoprefixer-core');
var reload = browserSync.reload;

gulp.task('default', function() {
  runSequence(['del', 'nodemon', 'browser-sync']);
});

gulp.task('reload', function() {
  setTimeout(function() {
    reload({
      stream: false
    });
  }, 1000);
});

gulp.task('nodemon', function() {
  return nodemon({
      script: 'bin/www',
      ext: 'js jsx html ejs scss',
      ignore: ['public/**/*.*', 'node_modules/']
    })
    .on('start', 'build');
});

gulp.task('del', function() {
  del.sync(['public/js']);
});

gulp.task('build', ['webpack', 'reload']);

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

gulp.task('browser-sync', function() {
  browserSync.init(null, {
    proxy: 'http://localhost:8000',
    browser: 'google chrome',
    port: 7000,
  });
});