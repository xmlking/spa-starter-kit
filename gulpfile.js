'use strict';

var gulp = require('gulp');
// set env default to DEV. override it to 'PROD' in build step.
global.env  = process.env.NODE_ENV  || 'DEV';
require('require-dir')('./gulp');

gulp.task('default', ['clean'], function () {
    global.env = 'PROD';
    gulp.start('build');
});
