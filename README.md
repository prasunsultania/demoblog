demoproject
===========

[![Build Status](https://travis-ci.org/prasunsultania/demoblog.svg?branch=master)](https://travis-ci.org/prasunsultania/demoblog)
[![Coverage Status](https://img.shields.io/coveralls/prasunsultania/demoblog.svg)](https://coveralls.io/r/prasunsultania/demoblog)
[![Requirements Status](https://requires.io/github/prasunsultania/demoblog/requirements.png?branch=master)](https://requires.io/github/prasunsultania/demoblog/requirements/?branch=master)

<a href="https://david-dm.org/prasunsultania/demoblog#info=devDependencies&view=table"><img src="https://david-dm.org/prasunsultania/demoblog.png"></a>
<br/>

<h2>Overview</h2>
If you are willing to setup a server using MEAN stack and you want to deploy code to a PaaS, You might find this repository useful.
Will blog about the framework and its details on http://prasun.io/ when I have it in functional state.    

Helpful Repositories which inspired a good part of the code:<br/>
1) http://scotch.io/series/easy-node-authentication

<h3>Getting Started:</h3>
1) Fork and checkout<br/>
2) create a file .env.js, referring to .env.refer If you need help please post a question on twitter @prasunsultania, or open a bug, if you think its a bug<br/>
	<span style="padding-left:5em;">a) You need to have a mongod running on your local machine or subscribe for a Mongolab/MongoHQ account and paste its url in your .env.js</span><br/>
	<span style="padding-left:5em;">b) Create a basic app in FB, Google and Twitter if you want to allow logging in from these sites and enter API key, secret and callback urls in .env.js</span><br/>
3) Following commands:<br/>
	<code>npm install<br/>
	cd public<br/>
	npm install<br/>
	bower install<br/>
	cd..<br/>
	node app</code><br/><br/>
4) Thats it. Running tests (Backend Only):<br/>
	a) Mac/Unix/Linux:<br/>
		<code>make test</code><br/>
	b) Windows:<br/>
	    <code>cd node_modules\.bin<br/>
		mocha -R spec -t 15000 PathToRepo\test\test*.js</code><br/>
		
<h3>Design Goals:</h3>
<ul>
	<li>Develop using MEAN Stack and keep code platform agnostic to allow deploying on any PaaS.</li>
	<li>Front end and Back end decoupled of each other</li>
		<ul><li>All Front end and its dependencies are under ./public</li></ul>
 	<li>Test Driven Development with Continuous Integration</li>
 		<ul>
 		    <li>For CI: Used Travis CI, its very simple to use and nicely documented.</li>
 		<li>For Back End: Used Mocha as test framework, Istanbul for code coverage and used Coveralls that uses the lcov output to give coverage report for each build and a nice badge</li>
 		<li>For Front End: Again Mocha and Istanbul serves great. Here Tests are of two kinds:</li>
 			<ul>
 			    <li>Unit: Karma serves good for the purpose of Unit tests, it runs all the JS in real browser.</li>
 			    <li>Functional: Or End to End tests are ran using Protractor on real browser.</li>
 			</ul>
 		</ul>
 			<li>In each build commit on CI platform tests are ran using Saucelabs which kind of give you Cloud Access to the browser. Another great part of Saucelabs is that it is able to use localhost urls.</li>
 	<li>PaaS Deployments:
 	    <ul>
 		    <li>Currently code is deployed to Openshift by Travis CI once all the tests are passing</li>
 		    <li>I have done my best to keep code PaaS Platform agnostic.</li>
 		</ul>
 	</li>
</ul>