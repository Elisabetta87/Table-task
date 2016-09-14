module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
    '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
    '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
    '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
    ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    sass: {                              // Task
      table: {                            // Target
        options: {                       // Target options
          style: 'expanded'
        },
        files: {                         // Dictionary of files
          'style/table.css': 'style/table.scss'
        }
      }
    },
    cssmin: {
        options: {
          shorthandCompacting: false,
          roundingPrecision: -1
        },
      table: {
        files: [{
          expand: true,
          cwd: 'style',
          src: ['*.css', '!*.min.css'],
          dest: 'style/min',
          ext: '.min.css'
        }]
      }
    },
    postcss: {
          options: {
            map: {
              //inline: false, // save all sourcemaps as separate files...
              //annotation: 'bin/css/maps/' // ...to the specified directory
            },
            processors: [
              //require('pixrem')(), // add fallbacks for rem units
              require('autoprefixer')({
                browsers: [
                  '> 11%', //versions selected by global usage statistics
                  'Chrome >= 10',
                  'Explorer >= 6',
                  'Opera >= 11',
                  'Firefox >= 3.5',
                  'Safari >= 4',
                  'iOS >= 6'
                ]
              }) // add vendor prefixes
              //require('cssnano')() // minify the result
            ]
          },
          table: {
            src: "style/table.css"
          }
        }

  });



  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-postcss');



  grunt.registerTask('table', ['sass:table', 'postcss:table', 'cssmin:table']);
  

};