/**
 * This file is part of foggle-backend.
 *
 * foggle-redux. is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * foggle-backend is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with foggle-backend.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Gruntfile.js 25.06.18
 *
 * (c) Copyright 2018 ergovia GmbH
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
