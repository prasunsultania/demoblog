// Karma config details: http://karma-runner.github.io/0.12/config/configuration-file.html 
module.exports = function(config) {
	var customLaunchers,
		plugins;
	
	if(process.env.TRAVIS_BUILD_NUMBER){
		customLaunchers = {
			sauce_chrome : {
				 base: 'SauceLabs',
			     browserName: 'chrome',
			     platform: 'Windows 7'
			}
		};
		plugins = [ 		    
		    'karma-sauce-launcher',		    
			'karma-mocha', 
			'karma-chai', 
			'karma-junit-reporter',
			'karma-coverage' 
		];
	} else {
		customLaunchers = {Chrome: null, Firefox: null};
		plugins = [ 		    
		    'karma-chrome-launcher', 
		    'karma-firefox-launcher',
			'karma-mocha', 
			'karma-chai',
			'karma-junit-reporter',
			'karma-coverage' 
		];
	}
	
	
	config.set({				
		sauceLabs: {
	      startConnect: false,
	      testName: 'Awesome Blog Front End Unit tests',
	      build: process.env.TRAVIS_BUILD_NUMBER,
	      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER 
	    },
	    
	    port: 3000,

		basePath : '../',

		files : [ 'lib/angular/angular.js',
				'../public/libs/angular-route/angular-route.js',
				'../public/libs/angular-mocks/angular-mocks.js',
				'node_modules/sinon/lib/sinon.js', 'js/**/*.js',
				'test/lib/**/*.js', 
				'test/unit/**/*.js'
				],

		autoWatch : false,

		frameworks : [ 'mocha', 'chai' ],
				
		customLaunchers: customLaunchers,
	    
		browsers: Object.keys(customLaunchers),

		plugins : plugins,

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