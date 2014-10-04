import {ErrorHandler} from './errors';

let templateCache = require('gulp-angular-templatecache');

export default function views(gulp, cfg, args) {
  'use strict';
  gulp.task('views', function () {
    gulp.src('app/views/**/*.html')
      //.pipe(jade()).on('error', ErrorHandler.onError);
      .pipe( templateCache({
        module: 'templates',
        root: 'views/',
        standalone: true
      }))
      .pipe(gulp.dest('.tmp/scripts'));
  });

}
