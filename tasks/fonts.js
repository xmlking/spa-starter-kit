let mainBowerFiles  = require('main-bower-files'),
  filter          = require('gulp-filter'),
  flatten         = require('gulp-flatten');

export default function fonts(gulp, cfg, args) {
  'use strict';
  gulp.task('fonts', () => {
    return gulp.src(mainBowerFiles().concat(cfg.paths.fonts))
      .pipe(filter('**/*.{eot,svg,ttf,woff}'))
      .pipe(flatten())
      .pipe(gulp.dest('dist/common/fonts'));
  });
}
