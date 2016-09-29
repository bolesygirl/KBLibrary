var gulp = require('gulp');
var runSequence = require('run-sequence');
var gulpLoadTasks = require('gulp-load-tasks');

// --------------
// Style Task.
var styleConfig = require('./gulp-tools/styles/config');
gulpLoadTasks('gulp-tools/styles/tasks');

gulp.task('style.watch', function () {
    gulp.watch([styleConfig.lib.sass], ['build.style.lib']);
});

gulp.task('build.style', function (done) {
    runSequence(
        'build.style.lib',
        'manifest.style.lib',
        done);
});

// --------------
// Default Task
gulp.task('default', function (done) {
    runSequence(
        'build.style',
        done);
});
