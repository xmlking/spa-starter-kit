'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var rjs = require('requirejs');
var runSequence = require('run-sequence');

var config = require('./config');
// set env default to DEV. override it to 'PROD' in build step.
var env = process.env.NODE_ENV  || 'DEV';

// only use types during development/testing. when deploying, you use typeAssertions: false.
var  traceurOptions = config.traceur
traceurOptions.typeAssertions = (env === 'DEV');
traceurOptions.sourceMap = (env === 'DEV');

gulp.task('styles', function () {
    return gulp.src('app/styles/main.scss')
        .pipe($.plumber())
        .pipe($.rubySass({
            style: 'expanded',
            precision: 10,
            sourcemap: (env === 'DEV'), //sourceMapBasepath???
            loadPath: ['bower_components/bourbon/dist','bower_components/compass-mixins/lib']
        }))
        .pipe($.autoprefixer('last 2 version')) //.pipe($.autoprefixer("last 1 version", "> 1%", "ie 8", "ie 7", { cascade: true }))
        .pipe(gulp.dest('.tmp/styles'));
});

gulp.task('jshint', function () {
    return gulp.src('app/scripts/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('transpile', function () {
    return gulp.src('app/scripts/**/*.js')
        .pipe($.traceur(traceurOptions))
        .pipe(gulp.dest('.tmp/scripts'));
});

//gulp.task('transpile-deps', function(){
//    return gulp.src('bower_components/angular-diary/src/**/*.js')
//        .pipe($.traceur({modules: 'amd'}))
//        .pipe(gulp.dest('.tmp/scripts/diary'))
//        .pipe(gulp.src('bower_components/angular-di/src/*.js'))
//        .pipe($.traceur({modules: 'amd'}))
//        .pipe(gulp.dest('.tmp/scripts/di'))
//        .pipe(gulp.src('bower_components/angular-assert/src/*.js'))
//        .pipe($.traceur({modules: 'amd'}))
//        .pipe(gulp.dest('.tmp/scripts'));
//});

gulp.task('transpile-assert-amd', function(){
    return gulp.src('bower_components/angular-assert/src/assert.js')
        .pipe($.traceur({modules: 'amd'}))
        .pipe(gulp.dest('.tmp/scripts'));
});
gulp.task('transpile-diary-amd', function(){
    return gulp.src('bower_components/angular-diary/src/**/*.js')
        .pipe($.traceur({modules: 'amd'}))
        .pipe(gulp.dest('.tmp/scripts/diary'));
});
gulp.task('transpile-di-amd', function(){
    return gulp.src('bower_components/angular-di/src/*.js')
        .pipe($.traceur({modules: 'amd'}))
        .pipe(gulp.dest('.tmp/scripts/di'));
});
gulp.task('transpile-deps', ['transpile-assert-amd', 'transpile-diary-amd', 'transpile-di-amd']);

gulp.task('optimize', ['transpile', 'transpile-deps'], function (cb) {
    rjs.optimize(config.buildProfile, function (buildResponse) {
        //console.log('build response', buildResponse);
        cb();
    }, function(err) {
        cb(err);
    });
});

//gulp.task('views', function () {
//  return gulp.src('app/views/**/*.html')
//    .pipe($.minifyHtml({
//      empty: true,
//      spare: true,
//      quotes: true
//    }))
//    .pipe($.ngHtml2js({
//      moduleName: "xxx",
//      prefix: "/views/"
//    }))
//    .pipe(gulp.dest(".tmp/views"))
//    .pipe($.size());
//});

gulp.task('html', ['styles'], function () {
    var lazypipe = require('lazypipe');
    var cssChannel = lazypipe()
        .pipe($.csso)
        .pipe($.replace, 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap','fonts');

    return gulp.src('app/*.html')
        .pipe($.useref.assets({searchPath: '{.tmp,app}', types: ['css']}))
        .pipe($.if('*.css', cssChannel()))
        .pipe($.useref.restore())
//        .pipe($.if('*.js', $.uglify())) //TODO
        .pipe($.useref())
        .pipe(gulp.dest('dist'));
});

//gulp.task('html', ['styles', 'scripts', 'views'], function () {
//  var jsFilter = $.filter('**/*.js');
//  var cssFilter = $.filter('**/*.css');
//
//  return gulp.src('app/*.html')
//    .pipe($.inject(gulp.src('.tmp/partials/**/*.js'), {
//      read: false,
//      starttag: '<!-- inject:partials -->',
//      addRootSlash: false,
//      addPrefix: '../'
//    }))
//    .pipe($.useref.assets())
//    .pipe($.rev())
//    .pipe(jsFilter)
//    .pipe($.ngmin())
//    .pipe($.uglify())
//    .pipe(jsFilter.restore())
//    .pipe(cssFilter)
//    .pipe($.replace('bower_components/bootstrap-sass-official/vendor/assets/fonts/bootstrap','fonts'))
//    .pipe($.csso())
//    .pipe(cssFilter.restore())
//    .pipe($.useref.restore())
//    .pipe($.useref())
//    .pipe($.revReplace())
//    .pipe(gulp.dest('dist'))
//    .pipe($.size());
//});

gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', function () {
    var streamqueue = require('streamqueue');
    var grep = require('gulp-grep-stream');
    return streamqueue({objectMode: true},
        $.bowerFiles(),
        gulp.src('app/fonts/**/*')
    )
//        .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
        .pipe(grep('**/*.{eot,svg,ttf,woff}'))
        .pipe($.flatten())
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', function () {
    return gulp.src(['app/*.*', '!app/*.html', 'app/views**/**', 'app/scripts**/**/*.json'], {dot: true})
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

//gulp.task('build', ['jshint', 'html', 'images', 'fonts', 'extras']);
/**
 * Warning - optimizer task has to be done first, coz it overwrites  :(
 * workaround:  Do `clean` task first and then run `default` task
 */
gulp.task('build', function(cb) {
    runSequence('optimize', 'html', ['images', 'fonts', 'extras'], cb);
});