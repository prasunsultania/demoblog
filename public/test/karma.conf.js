/*
 * Karma config details: http://karma-runner.github.io/0.12/config/configuration-file.html
 */
module.exports = function(config) {
	var customLaunchers = {
		sauce_chrome : {
			 base: 'SauceLabs',
		     browserName: 'chrome',
		     platform: 'Windows 7'
		}
	};
	config.set({
		
		sauceLabs: {
	      username: undefined,
	      accessKey: undefined,
	      startConnect: false,
	      testName: 'front end blog unit tests',
	      build: process.env.TRAVIS_BUILD_NUMBER,
	      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER 
	    },
	    
	    port: 3000,

		basePath : '../',

		files : [ 'bower_components/angular/angular.js',
				'bower_components/angular-route/angular-route.js',
				'bower_components/angular-mocks/angular-mocks.js',
				'node_modules/sinon/lib/sinon.js', 'js/**/*.js',
				'test/lib/**/*.js', 'test/unit/**/*.js', ],

		autoWatch : false,

		frameworks : [ 'mocha', 'chai' ],

		//browsers : [ 'Chrome'/* , 'Firefox' */],
		
		customLaunchers: customLaunchers,
	    
		browsers: Object.keys(customLaunchers),

		plugins : [ 
		    /*'karma-chrome-launcher', 'karma-firefox-launcher',*/
		    'karma-sauce-launcher',
		    //'karma-sauce-launcher-fork',
			'karma-mocha', 
			'karma-chai', 
			'karma-junit-reporter',
			'karma-coverage' 
		],

		preprocessors : {
			'js/**/*.js' : 'coverage'
		},
		
		singleRun: true,

		reporters : [ 'coverage', 'junit', 'progress', 'saucelabs' ],

		coverageReporter : {
			type : 'lcov',
			dir : 'test/coverage/'
		},

		junitReporter : {
			outputFile : 'test/testres/unit.xml',
			suite : 'unit'
		}

	});
};