let wiredepStream = require('wiredep').stream;
let bowerRequireJS = require('bower-requirejs');

export default function wiredep(gulp, cfg, env) {
    'use strict';

    gulp.task('wiredep-scss', () => {
        return gulp.src('app/index.scss')
            .pipe(wiredepStream({
                directory: 'bower_components'
            }))
            .pipe(gulp.dest('app'));
    });

    gulp.task('wiredep-html', () => {
        return gulp.src('app/*.html')
            .pipe(wiredepStream({
                directory: 'bower_components',
                exclude: ['bootstrap-sass-official', 'bootstrap', /jquery/]
            }))
            .pipe(gulp.dest('app'));
    });

    //FIXME https://github.com/yeoman/bower-requirejs/issues/98
    gulp.task('wiredep-rjs', (cb) => {
        // exclude dev dependencies in optimized build.
        let AMDOptions = cfg.AMD;
        AMDOptions['exclude-dev'] = (optimize);

        bowerRequireJS(AMDOptions, (rjsConfigFromBower) => {
            if (!rjsConfigFromBower.paths)
                return cb(rjsConfigFromBower);
            cb()
        });
    });

    gulp.task('wiredep', gulp.parallel('wiredep-scss', 'wiredep-html', 'wiredep-rjs'));
}
