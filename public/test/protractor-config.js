var portNum = process.env.TRAVIS_BUILD_NUMBER && 3000 ||
	5000;
exports.config = {
  
  sauceUser: undefined,
  sauceKey: undefined,  
  allScriptsTimeout: 11000,    
  specs: ['e2e/*.js'],

  multiCapabilities: [  
    /*{'browserName': 'IE'},
    {'browserName': 'firefox'},*/
    {'browserName': 'chrome', 
    	'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
        'build': process.env.TRAVIS_BUILD_NUMBER,
        'name': 'Protractor Profile page Tests'}/*,
    {'browserName': 'safari'}*/
  ],

  /*replace it with correct url while running test*/
  //baseUrl: 'http://prasun.io/',
  baseUrl: 'http://login.localhost.in:' + portNum,

  framework: 'mocha' 
};
