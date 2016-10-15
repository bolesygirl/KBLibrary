'use strict';

var config = {
    lib: {
        sass: [
            'library/sass/**/*.scss',
            'library/components/**/*.scss'
        ],
        css: [
            'library/css/**/*.css'
        ],
        assets: [
            'library/assets/**/*.*'
        ],
        shared: [
            'library/shared/**/*.*'
        ],
        docs: 'library/components/**/*.ejs',
        dest: {
            'root': 'dist',
            'styles': 'dist/styles',
            'docs': 'dist/docs',
            'css': ['dist/styles/**/*.css'],
            'reports': 'reports'
        }
    },
    tests: {
        files: [
            'vendor/scripts/jquery-3.1.1.slim.min.js',
            'vendor/scripts/jasmine-jquery.js',
            'library/components/**/*.js',
            'library/components/**/*.spec.js'
        ],
        preprocessors: {
            'library/components/**/*.js': ['coverage']
        }
    }
};

module.exports = config;
