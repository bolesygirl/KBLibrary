'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var paths = require('../config');
var runSequence = require('run-sequence');
var sassSrc = paths.lib.sass;
var sassDest = './dist';

gulp.task('clean:style:lib', function () {
    console.log('========CLEANING========');
    return gulp
        .src(sassDest, { read: false })
        .pipe(plugins.rimraf());
});

gulp.task('copy:style:lib', function () {
    console.log('========COPYING========');
    return gulp.src(sassSrc)
        .pipe(gulp.dest(sassDest))
        .on('error', plugins.util.log);
});

gulp.task('sass:style:lib', function () {
    console.log('========SASSING========');
    console.log(sassDest);

    return gulp.src(sassSrc)
        .pipe(plugins.plumber())
        .pipe(plugins.sass())
        .pipe(plugins.autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./dist'))
        .on('error', plugins.util.log);
});

module.exports = function (done) {
    runSequence(
        'clean:style:lib',
        'sass:style:lib',
        done);
};
