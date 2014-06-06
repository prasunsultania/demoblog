module.exports = function(grunt) {
  // Project configuration.
  grunt
      .initConfig({
        pkg : grunt.file.readJSON('package.json'),
        jshint : {
          options : {
            reporter : require('jshint-stylish'),
            ignores : [ "public/js/app.min.js", "public/js/controllers.min.js",
                'public/libs/**/*.js', 'node_modules/**/*.js',
                'public/test/lib/**/*.js', 'test/coverage/**/*.js' ],
            globals : {
              window : true,
              angular : true
            },
            "-W097" : true
          },
          all : [ "**/*.js" ]
        },
        csslint : {
          src : [ 'public/css/app.css' ],
          options : {
            'adjoining-classes' : false
          }
        },
        uglify : {
          options : {
            banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
          },
          build : {
            files : [ {
              src : 'public/js/app.js',
              dest : 'public/js/app.min.js',
              cwd : process.cwd()
            }, {
              src : 'public/js/controllers.js',
              dest : 'public/js/controllers.min.js',
              cwd : process.cwd()
            } ]
          }
        },
        cssmin : {
          options : {
            banner : '/* My minified css file */'
          },
          minify : {
            files : [ {
              src : 'public/css/app.css',
              dest : 'public/css/app.min.css',
              cwd : process.cwd()
            } ]
          }
        },
        mochaTest : {
          test : {
            options : {
              reporter : 'spec',
              timeout : 20000
            },
            src : [ 'test/test*.js' ]
          }
        },
        env : {
          test : {
            NODE_ENV : 'test'
          }
        },
        mocha_istanbul : {
          coverage : {
            src : 'test', // the folder, not the files
            options : {
              mask : 'test*.js',
              timeout : 20000,
              reporter : 'spec',
              coverageFolder : 'test/coverage',
              check : {
                lines : 30,
                statements : 30
              }
            }
          },
          coveralls : {
            src : 'test', // the folder, not the files
            options : {
              mask : 'test*.js',
              timeout : 20000,
              reporter : 'spec',
              coverage : true,
              coverageFolder : 'test/coverage',
              check : {
                lines : 30,
                statements : 30
              }
            }
          }
        }
      });

  grunt.event.on('coverage', function(lcov, done) {
    require('coveralls').handleInput(lcov, function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-mocha-istanbul');

  //Unit test
  grunt.registerTask('default', [ 'jshint', 'csslint', 'uglify', 'cssmin' ]);
  //To run unit tests without code coverage report 
  grunt.registerTask('test', [ 'jshint', 'csslint', 'uglify', 'cssmin', 'env:test', 'mochaTest' ]);
  //To run unit test+coveralls - run only on Travis  
  grunt.registerTask('testCoveralls', [ 'jshint', 'csslint', 'uglify', 'cssmin', 'mocha_istanbul:coveralls' ]);
  //To run unit with coverage report
  grunt.registerTask('testCoverage', [ 'jshint', 'csslint', 'uglify', 'cssmin', 'env:test', 'mocha_istanbul:coverage' ]);
};