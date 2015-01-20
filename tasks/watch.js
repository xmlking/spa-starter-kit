export default function watch(gulp, cfg, env) {
  'use strict';
  gulp.task('watch', gulp.series(gulp.parallel('styles', 'scripts'), function () {
    gulp.watch('app/**/*.scss', 'styles');
    gulp.watch(cfg.paths.scripts, 'transpile');
    gulp.watch(cfg.paths.images, 'images');
    gulp.watch('bower.json', 'wiredep');
  }));
}
