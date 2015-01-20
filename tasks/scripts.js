import {ErrorHandler} from './errors';

let jshint      = require('gulp-jshint'),
  gif         = require('gulp-if'),
  filter      = require('gulp-filter'),
  preprocess  = require('gulp-preprocess'),
  traceur     = require('gulp-traceur'),
  sourcemaps  = require('gulp-sourcemaps'),
  browserSync = require('browser-sync'),
  cached      = require('gulp-cached'),
  reload      = browserSync.reload;

export default function scripts(gulp, cfg, args) {
  'use strict';

  gulp.task('jshint', function () {
    return gulp.src(cfg.paths.scripts)
      .pipe(reload({stream: true, once: true}))
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'))
      .pipe(gif(!browserSync.active, jshint.reporter('fail')))
      .on('error', ErrorHandler.onError);
  });

  // only use types during development/testing. when deploying, you use typeAssertions: false.
  let traceurOptions = cfg.traceur;
  traceurOptions.typeAssertions = (!optimize);

  gulp.task('transpile', () => {
    return gulp.src(cfg.paths.scripts)
      .pipe(cached('transpile'))
      .pipe(gif(/app\\index.js/, preprocess({context: {env}}))) //for Windows
      .pipe(gif(/app\/index.js/, preprocess({context: {env}})))
      .pipe(gif(!optimize, sourcemaps.init()))
      .pipe(traceur(traceurOptions))
      .on('error', ErrorHandler.onError)
      .pipe(gif(!optimize, sourcemaps.write('.', {includeContent: false, sourceRoot: '/app'})))
      .pipe(gulp.dest('.tmp'))
      .pipe(filter('**/*.js'))
      .pipe(browserSync.reload({stream:true}));
  });

  gulp.task('transpile-assert-amd', () => {
    return gulp.src('bower_components/assert/src/assert.js')
      .pipe(traceur({modules: 'amd'}))
      .pipe(gulp.dest('bower_components/assert/dist/amd'));
  });
  gulp.task('transpile-diary-amd', () => {
    return gulp.src('bower_components/diary/src/**/*.js')
      .pipe(traceur({modules: 'amd'}))
      .pipe(gulp.dest('bower_components/diary/dist/amd'));
  });
  gulp.task('transpile-di-amd', () => {
    return gulp.src('bower_components/di/src/*.js')
      .pipe(traceur({modules: 'amd'}))
      .pipe(gulp.dest('bower_components/di/dist/amd'));
  });

  gulp.task('transpile-deps', gulp.parallel('transpile-assert-amd', 'transpile-diary-amd', 'transpile-di-amd'));

  gulp.task('transpile-deps-and-wiredep', gulp.series('transpile-deps', 'wiredep'));

  //gulp.task('scripts', gulp.series('jshint', 'transpile')); //TODO: jshint is not ready for ES6
  gulp.task('scripts', gulp.series('transpile'));
}
