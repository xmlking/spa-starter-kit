let imagemin    = require('gulp-imagemin');

export default function images(gulp, cfg, args) {
  'use strict';
  gulp.task('images', () => {
    return gulp.src(cfg.paths.images)
      .pipe(imagemin({
        optimizationLevel: 3,
        progressive: true,
        interlaced: true
      }))
      .pipe(gulp.dest('dist'));
  });
}
