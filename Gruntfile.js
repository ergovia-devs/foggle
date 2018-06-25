/*
 * Gruntfile.js 25.06.18
 *
 * (c) 2018 ergovia GmbH
 */
module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        babel: {
            options: {
                sourceMap: true,
                presets: ['env'],
                sourceRoot: 'src'
            },
            dist: {

                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: '**/*.js',
                        dest: 'build/'
                    }
                ]

            }

        },

        clean: {
            main: ['build/']
        }


    });

    grunt.registerTask('build', 'Baut das Projekt', ['clean', 'babel']);

};
