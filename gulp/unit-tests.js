'use strict';

var gulp = require('gulp');
var karma = require('karma').server;

var karmaCommonConf = require('./config').karmaCommonConf;

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

