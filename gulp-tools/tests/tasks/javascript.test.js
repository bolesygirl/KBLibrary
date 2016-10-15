'use strict';

var gulp = require('gulp');
var config = require('../../config');
var karmaConf = require('../karma.conf.js');
var Server = require('karma').Server;
var _ = require('lodash');
var testConfig;

karmaConf({
    set: function (newConfig) {
        testConfig = _.assign({}, newConfig, {
            action: 'run',
            files: config.tests.files,
            basePath: './',
            preprocessors: config.tests.preprocessors
        });
    }
});

gulp.task('javascript.test.debug', function (done) {
    console.log('Debugging javascript tests');
    new Server(_.assign({}, testConfig, {
        singleRun: false,
        autoWatch: true,
        reporters: ['dots'],
        browsers: ['Chrome']
    }), done).start();
});

gulp.task('javascript.test', function (done) {
    console.log('Running javascript tests');
    new Server(_.assign({}, testConfig, {
        singleRun: true,
        autoWatch: false,
        reporters: ['dots', 'coverage'],
        coverageReporter: {
            dir: config.lib.dest.reports,
            subdir: 'coverage',
            reporters: [
                { type: 'html' },
                { type: 'text-summary' }
            ]
        },
    }), done).start();
});

module.exports = function (done) {
    new Server(_.assign({}, testConfig, {
        singleRun: true,
        autoWatch: false,
        reporters: ['dots', 'coverage'],
        coverageReporter: {
            dir: config.lib.dest.reports,
            subdir: 'coverage',
            reporters: [
                { type: 'html' },
                { type: 'text-summary' }
            ]
        },
    }), done).start();
};
