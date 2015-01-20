import {ErrorHandler} from './errors';

let sass        = require('gulp-ruby-sass'),
  sourcemaps  = require('gulp-sourcemaps'),
  filter      = require('gulp-filter'),
  browserSync = require('browser-sync'),
  autoprefixer= require('gulp-autoprefixer'),
  reload      = browserSync.reload;

export default function styles(gulp, cfg, args) {
  'use strict';

  gulp.task('styles', () => {
    return sass('app', {
      style: 'expanded',
      precision: 10,
      sourcemap: (!optimize),
      loadPath: ['bower_components/bourbon/dist', 'bower_components/compass-mixins/lib']
    })
    .on('error', ErrorHandler.onError)
    .pipe(autoprefixer(cfg.autoprefixer))
    .pipe(sourcemaps.write('.', {
      includeContent: false,
      sourceRoot: '.'
    }))
    .pipe(gulp.dest('.tmp'))
    .pipe(filter('**/*.css'))
    .pipe(reload({stream: true}));
  });
}
