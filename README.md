demoproject
===========

[![Build Status](https://travis-ci.org/prasunsultania/demoblog.svg?branch=master)](https://travis-ci.org/prasunsultania/demoblog)
[![Coverage Status](https://img.shields.io/coveralls/prasunsultania/demoblog.svg)](https://coveralls.io/r/prasunsultania/demoblog)
[![Requirements Status](https://requires.io/github/prasunsultania/demoblog/requirements.png?branch=master)](https://requires.io/github/prasunsultania/demoblog/requirements/?branch=master)

https://david-dm.org/prasunsultania/demoblog.png

If you are willing to setup a server using MEAN stack and you want to deploy code to a PaaS, You might find this repository useful.
Will blog about the framework and its details on http://prasun.io/ when I have it in functional state.    

Helpful Repositories which inspired a good part of the code:
1) http://scotch.io/series/easy-node-authentication

Getting Started:
1) Fork and checkout
2) create a file .env.js, referring to .env.refer If you need help please post a question on twitter @prasunsultania, or open a bug, if you think its a bug
	a) You need to have a mongod running on your local machine or subscribe for a Mongolab/MongoHQ account and paste its url in your .env.js
	b) Create a basic app in FB, Google and Twitter if you want to allow logging in from these sites and enter API key, secret and callback urls in .env.js
3) Following commands
	npm install
	cd public
	npm install
	bower install
	cd..
	node app
4) Thats it. Running tests (Backend Only):
	a) Mac/Unix/Linux:
		make test
	b) Windows:
	    cd node_modules\.bin
		mocha -R spec -t 15000 PathToRepo\test\test*.js
		
Design Goals:
	Develop using MEAN Stack and keep code platform agnostic to allow deploying on any PaaS.
	Front end and Back end decoupled of each other
		All Front end and its dependencies are under ./public
 	Test Driven Development with Continuous Integration
 		For CI: Used Travis CI, its very simple to use and nicely documented.
 		For Back End: Used Mocha as test framework, Istanbul for code coverage and used Coveralls that uses the lcov output to give coverage report for each build and a nice badge
 		For Front End: Again Mocha and Istanbul serves great. Here Tests are of two kinds
 			Unit: Karma serves good for the purpose of Unit tests, it runs all the JS in real browser.
 			Functional: Or End to End tests are ran using Protractor on real browser.
 			In each build commit on CI platform tests are ran using Saucelabs which kind of give you Cloud Access to the browser. Another great part of Saucelabs is that it is able to use localhost urls.
 	PaaS Deployments:
 		Currently code is deployed toOpenshift by Travis CI once all the tests are passing.
 		Aim is to keep it PaaS vendor agnostic and also CI vendor agnostic.  		  	    		