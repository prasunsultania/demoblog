var ngrok = require('ngrok');

module.exports = function(grunt) {
  // Project configuration.
  require('load-grunt-tasks')(grunt);
  
  grunt
      .initConfig({
        pkg : grunt.file.readJSON('package.json'),
        jshint : {
          all : {
            options : {
              reporter : require('jshint-stylish'),
              ignores : [ "public/jsmin/**/*.js",
                  "public/js/controllers.min.js", 'public/libs/**/*.js',
                  'node_modules/**/*.js', 'test/coverage/**/*.js',
                  'public/test/**/*.js' ],
              globals : {
                window : true,
                angular : true,
                require : true,
                console : true
              },
              "-W097" : true, //Use the function form of "use strict"
              "-W014" : true //bad breakup before +
            },
            src : [ "**/*.js" ]
          },
          frontendTests : {
            options : {
              reporter : require('jshint-stylish'),
              ignores : [ 
                  'public/test/coverage/**/*.js', 'public/test/lib/**/*.js'],
              globals : {
                window : true,
                angular : true,
                require : true,
                describe : true,
                beforeEach : true,
                module : true,
                inject : true,
                it : true,
                expect : true,
                protractor : true,
                before : true,
                console : true,
                browser : true,
                By : true
              },
              "-W097" : true,//Use the function form of "use strict"
              "-W014" : true //bad breakup before +
            },
            src : [ "public/test/**/*.js" ]
          }
        },
        csslint : {
          src : [ 'public/css/app.css' ],
          options : {
            'adjoining-classes' : false //IE6 and earlier doesnt handle it, so linter isnt happy.
          }
        },
        uglify : {
          options : {
            banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
          },
          build : {
            files : [ {
              src : 'public/js/app.js',
              dest : 'public/jsmin/app.min.js',
              cwd : process.cwd()
            }, {
              src : 'public/js/controllers.js',
              dest : 'public/jsmin/controllers.min.js',
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
                lines : 50,
                statements : 50
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
                lines : 50,
                statements : 50
              }
            }
          }
        },
        gpageinsights: {
          options: {
            nokey: true,
            url: '<%= gpageinsights.options.url %>'
          },
          local: {
            options: {
              locale: "en_US",
              verify_MinifyCss: 0,
              verify_MinifyHTML: 0,
              verify_MinifyJavaScript: 0,
              //verify_MainResourceServerResponseTime: 1,
              strategy: "desktop",
              url: '<%= gpageinsights.local.options.url %>',
              threshold: 80
            }
          },
          mobile: {
            options: {
              locale: "en_US",
              verify_MinifyCss: 0,
              verify_MinifyHTML: 0,
              verify_MinifyJavaScript: 0,              
              strategy: "mobile",
              url: '<%= gpageinsights.mobile.options.url %>',
              threshold: 80
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
  grunt.loadNpmTasks('gpageinsights');
  grunt.loadNpmTasks('grunt-mocha-istanbul');

  // Unit test
  grunt.registerTask('default', [ 'jshint', 'csslint', 'uglify', 'cssmin' ]);
  
  //just bacend unit test
  grunt.registerTask('onlytest', ['env:test', 'mochaTest']);
  // To run unit tests without code coverage report
  grunt.registerTask('test', [ 'jshint', 'csslint', 'uglify', 'cssmin',
      'env:test', 'mochaTest', 'gpageinsights-ngrok']);
  // To run unit test+coveralls - run only on Travis
  grunt.registerTask('testCoveralls', [ 'jshint', 'csslint', 'uglify',
      'cssmin', 'mocha_istanbul:coveralls', 'gpageinsights-ngrok' ]);
  // To run unit with coverage report
  grunt.registerTask('testCoverage', [ 'jshint', 'csslint', 'uglify', 'cssmin',
      'env:test', 'mocha_istanbul:coverage' ]);
  
  grunt.registerTask('gpageinsights-ngrok', 'Run gpageinsights with ngrok', function() {
    var done = this.async();
    var port = process.env.NODEJS_PORT || 8080;

    ngrok.connect({
      //authtoken: process.env.NGROK_AUTH_TOKEN,
      //subdomain: 'login',
      //httpauth: process.env.NGROK_HTTP_AUTH,
      port: port
    }, function(err, url) {
      if (err !== null) {
        grunt.fail.fatal(err);
        return done();
      }
      
      process.env.NGROK_URI = url.replace(/http:\/\/|https:\/\//, '');
      //start app
      require('./app');
      console.log('process ngrok url: ' + process.env.NGROK_URI);
      console.log('ngrok url: ' + url);
      setTimeout(function(){
        grunt.config.set('gpageinsights.options.url', url);
        grunt.config.set('gpageinsights.local.options.url', url);
        grunt.config.set('gpageinsights.mobile.options.url', url);
        grunt.task.run('gpageinsights');
        done();
      }, 3000);
      
    });
  });
  
};