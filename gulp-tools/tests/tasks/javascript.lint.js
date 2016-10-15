'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var paths = require('../../config');
var runSequence = require('run-sequence');

gulp.task('javascript.lint', function () {
    console.log('Linting javascript');
    return gulp.src(paths.tests.files)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'))
        .pipe(plugins.jscs())
        .pipe(plugins.jscs.reporter())
        .on('error', plugins.util.log);
});

module.exports = function (done) {
    runSequence(
        'javascript.lint',
        done);
};

