import {ErrorHandler} from './errors';

let jshint      = require('gulp-jshint'),
    gif         = require('gulp-if'),
    preprocess  = require('gulp-preprocess'),
    traceur     = require('gulp-traceur'),
    sourcemaps  = require('gulp-sourcemaps'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload;

export default function scripts(gulp, cfg, args) {
    'use strict';

    gulp.task('jshint', function () {
        return gulp.src('app/scripts/**/*.js')
            .pipe(reload({stream: true, once: true}))
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'))
            .pipe(gif(!browserSync.active, jshint.reporter('fail')))
            .on('error', ErrorHandler.onError);
    });

    // only use types during development/testing. when deploying, you use typeAssertions: false.
    let traceurOptions = cfg.traceur;
    traceurOptions.typeAssertions = (env === 'DEV');

    gulp.task('transpile', () => {
        return gulp.src('app/scripts/**/*.js')
            .pipe(gif(/app\/scripts\/index.js/, preprocess({context: {env}})))
            .pipe(gif(env === 'DEV', sourcemaps.init()))
                .pipe(traceur(traceurOptions))
                .on('error', ErrorHandler.onError)
            .pipe(gif(env === 'DEV', sourcemaps.write('.', {includeContent: false, sourceRoot: '/app/scripts'})))
            .pipe(gulp.dest('.tmp/scripts'));
    });

    gulp.task('transpile-assert-amd', () => {
        return gulp.src('bower_components/angular-assert/src/assert.js')
            .pipe(traceur({modules: 'amd'}))
            .pipe(gulp.dest('.tmp/scripts'));
    });
    gulp.task('transpile-diary-amd', () => {
        return gulp.src('bower_components/angular-diary/src/**/*.js')
            .pipe(traceur({modules: 'amd'}))
            .pipe(gulp.dest('.tmp/scripts/diary'));
    });
    gulp.task('transpile-di-amd', () => {
        return gulp.src('bower_components/angular-di/src/*.js')
            .pipe(traceur({modules: 'amd'}))
            .pipe(gulp.dest('.tmp/scripts/di'));
    });


    gulp.task('scripts', (cb) => {
        runSequence(['transpile-assert-amd', 'transpile-diary-amd', 'transpile-di-amd'], 'transpile', cb);
    });
}