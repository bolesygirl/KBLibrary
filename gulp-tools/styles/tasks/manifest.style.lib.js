'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var paths = require('../config');
var join = require('path').join;
var runSequence = require('run-sequence');
var _ = require('lodash');
var sassSrc = paths.lib.sass;
var sassDest = paths.lib.css;
var sassDist = paths.lib.dist;

var manifestDefaults = {
    manifestFile: 'asset_manifest.json',
    includeRelativePath: true,
    pathSeparator: '/'
};

gulp.task('clean:manifest', function () {
    var manifestFile = [
        join(__dirname, '../', '../', manifestDefaults.manifestFile)
    ];
    return gulp.src(manifestFile)
        .pipe(plugins.rimraf());
});

gulp.task('minify:style:lib', function () {
    return gulp.src(sassDist)
        .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(plugins.minifyCss())
        .pipe(gulp.dest('dist'))
        .on('error', plugins.util.log);
});

// Create revision version of files
gulp.task('rev:style:lib', function () {
    return gulp.src(sassDist)
        .pipe(plugins.rev())
        .pipe(gulp.dest('dist'))
        .pipe(plugins.rev.manifest())
        .pipe(gulp.dest('dist'))
        .on('error', plugins.util.log);
});

gulp.task('manifest:style:lib', function () {
    return createManifest(sassDest, 'kblibrary.css', 'dist');
});

function createManifest(files, bundle, bundleType) {
    return gulp.src(files)
        .pipe(plugins.assetManifest(_.extend({
            bundleName: bundle + ':' + bundleType
        }, manifestDefaults)));
}

module.exports = function (done) {
    runSequence(
        'clean:manifest',
        'minify:style:lib',
        'rev:style:lib',
        'manifest:style:lib',
        done);
};
