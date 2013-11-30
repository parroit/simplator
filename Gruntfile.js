'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        watch: {
            scripts: {
                files: ['**/*.js'],
                tasks: ['mochaTest'],
                options: {
                    spawn: true
                }
            }
        },
       
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/**/*.js']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('test', 'mochaTest');
    grunt.registerTask('watch-test', 'watch');

    
};
