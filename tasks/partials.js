import {ErrorHandler} from './errors';

let templateCache = require('gulp-angular-templatecache');


export default function views(gulp, cfg, args) {
    'use strict';
    //TODO simplify  copy-tpl
    gulp.task('copy-tpl', () => {
        return gulp.src('app/*/elements/*.tpl.html')
            .pipe(gulp.dest('.tmp'));
    });

    gulp.task('views',gulp.series('copy-tpl', () => {
        return gulp.src(cfg.paths.views)
            //.pipe(jade()).on('error', ErrorHandler.onError);
            .pipe(templateCache({
                module: 'templates',
//                root: 'views/',
                standalone: true
            }))
            .pipe(gulp.dest('.tmp'));
    }));

}
