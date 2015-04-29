export default function watch(gulp, cfg, env) {
  'use strict';
  gulp.task('watch', gulp.series(gulp.parallel('styles', 'scripts'), function () {
    gulp.watch('app/**/*.scss', gulp.series('styles'));
    gulp.watch(cfg.paths.scripts, gulp.series('transpile'));
    gulp.watch(cfg.paths.images, gulp.series('images'));
    gulp.watch('bower.json', gulp.series('wiredep'));
  }));
}
