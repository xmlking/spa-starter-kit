let GulpProtractor = require('gulp-protractor');

export default function e2eTests(gulp, cfg, args) {
  'use strict';
  // Downloads the selenium webdriver
  gulp.task('webdriver-update', GulpProtractor.webdriver_update);

  gulp.task('webdriver-standalone', GulpProtractor.webdriver_standalone);

  gulp.task('protractor-only', gulp.series(gulp.parallel('webdriver-update', 'wiredep'),  (done) => {
    var testFiles = [
      'test/e2e/**/*.js'
    ];

    return gulp.src(testFiles)
      .pipe(GulpProtractor.protractor({
        configFile: 'test/protractor.conf.js'
      }))
      .on('error', (err) => {
        // Make sure failed tests cause gulp to exit non-zero
        throw err;
      })
      .on('end', () => {
        // Close connect server to and gulp connect task
        // Feature ignored because it's not possible to stop browser sync
        // browserSync.close();
        done();
      });
  }));

  gulp.task('protractor', gulp.parallel('serve:e2e', 'protractor-only'));
  gulp.task('protractor:src', gulp.parallel('serve:e2e', 'protractor-only'));
  gulp.task('protractor:dist', gulp.parallel('serve:e2e-dist', 'protractor-only'));
}
