'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var paths = require('../../config');
var join = require('path').join;
var runSequence = require('run-sequence');
var _ = require('lodash');
var sassSrc = paths.lib.sass;
var cssDist = paths.lib.dest.css;
var sassDest = paths.lib.dest.styles;

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
    return gulp.src(cssDist)
        .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(plugins.minifyCss())
        .pipe(gulp.dest(sassDest))
        .on('error', plugins.util.log);
});

// Create revision version of files
gulp.task('rev:style:lib', function () {
    return gulp.src(cssDist)
        .pipe(plugins.rev())
        .pipe(gulp.dest(sassDest))
        .pipe(plugins.rev.manifest())
        .pipe(gulp.dest(sassDest))
        .on('error', plugins.util.log);
});

gulp.task('manifest:style:lib', function () {
    return createManifest(cssDist, 'kblibrary.css', paths.lib.dest.root);
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
