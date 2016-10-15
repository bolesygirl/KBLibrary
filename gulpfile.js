var gulp = require('gulp');
var ejs = require('gulp-ejs');
var watchEjs = require('gulp-watch-ejs');
var runSequence = require('run-sequence');
var gulpLoadTasks = require('gulp-load-tasks');
var config = require('./gulp-tools/config');

// --------------
// Style Task.

gulpLoadTasks('gulp-tools/styles/tasks');

gulp.task('style.watch', function () {
    gulp.watch(config.lib.sass, ['build.style']);
});

gulp.task('docs.watch', function () {
  return gulp.src(config.lib.docs)
   .pipe(watchEjs(config.lib.docs, {ext:'.html'}))
   .pipe(gulp.dest(config.lib.dest.docs));
});

gulp.task('build.style', function (done) {
    runSequence(
        'build.style.lib',
        'manifest.style.lib',
        done);
});

gulp.task('build.docs', function(){
  return gulp.src(config.lib.docs)
   .pipe(ejs({}, {ext:'.html'}))
   .pipe(gulp.dest(config.lib.dest.docs));
});

// --------------
// Test tasks
gulpLoadTasks('gulp-tools/tests/tasks');

gulp.task('test.javascript', function (done) {
    runSequence(
        'javascript.test',
        'javascript.lint',
        done);
});

// --------------
// Default Task
gulp.task('default', function (done) {
    runSequence(
        'build.style',
        'build.docs',
        done);
});

//Watch Tasks
gulp.task('watch', function (done) {
    runSequence(
        'style.watch',
        'docs.watch',
        done);
});
