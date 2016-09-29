'use strict';

var config = {
    lib: {
        sass: [
            'library/sass/**/*.scss'
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
        dest: 'dist',
        dist: [
            'dist/**/*.css'
        ]
    }
};

module.exports = config;
