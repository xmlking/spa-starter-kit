'use strict';
/* global config */

var gulp = require('gulp');
var karma = require('karma').server;

var karmaCommonConf = config.karmaCommonConf;

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
    karmaCommonConf.singleRun = true;
    karma.start(karmaCommonConf, done);
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function (done) {
    karma.start(karmaCommonConf, done);
});

