Awesome Blog
===========

[![Build Status](https://travis-ci.org/prasunsultania/demoblog.svg?branch=master)](https://travis-ci.org/prasunsultania/demoblog)
[![Coverage Status](https://img.shields.io/coveralls/prasunsultania/demoblog.svg)](https://coveralls.io/r/prasunsultania/demoblog)

<a href="https://david-dm.org/prasunsultania/demoblog#info=dependencies&view=table"><img src="https://david-dm.org/prasunsultania/demoblog.png"></a>
<a href="https://david-dm.org/prasunsultania/demoblog#info=devDependencies&view=table"><img src="https://david-dm.org/prasunsultania/demoblog/dev-status.svg"/></a>
<br/>

<a href="https://saucelabs.com/u/prasun_sultania">
  <img src="https://saucelabs.com/browser-matrix/prasun_sultania.svg" alt="Selenium Tests Status" />
</a>

<h3>Overview</h3>
If you are willing to setup a server using MEAN stack and you want to deploy code to a PaaS, You might find this repository useful.
Will blog about the framework and its details on http://prasun.io/ when I have it in functional state.    

Helpful Repositories which inspired a good part of the code:<br/>
1) http://scotch.io/series/easy-node-authentication

<h3>Getting Started:</h3>
<ol>
<li> Fork and checkout</li>
<li> Create a file .env.js, referring to .env.refer. If you need help please post a question on twitter @prasunsultania, or open a bug, if you think its a bug</li>
	<span style="padding-left:5em;">a) You need to have a mongod running on your local machine or subscribe for a Mongolab/MongoHQ account and paste its url in your .env.js</span><br/>
	<span style="padding-left:5em;">b) Create a basic app in FB, Google and Twitter and enter API key, secret and callback urls in .env.js</span><br/>
<li>Add an entry for login.localhost.in your hosts file, pointing to 127.0.0.1</li>
<li>Run Following commands while you are in root directory of repository:
    <ul>
    	<li><code>npm install</code></li>
    	<li><code>bower install</code></li>
    	<li><code>node app</code></li>
	</ul>
</li>
<li>Register with NGROK to test custom domains based pageSpeedInsight custom domains. After registration make sure to set 
 <code>NGROK_AUTH_TOKEN</code>&nbsp;and&nbsp;<code>NGROK_HTTP_AUTH</code>&npsp;and correct your domain name config in gruntfile.js code that connects to ngrok. If you dont want to register with ngrok, remove all configs in gruntfile.js for ngrok other than port.</li>
<li> Thats it. Running tests (Backend Only):<br/>	
		<code>grunt testCoverage</code>&nbp;or use <code>node_modules\.bin\grunt testCoverage</code>
</li>
</ol>	

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
 		    <li>Currently code is deployed to CloudControl and Heroku by Travis CI once all the tests are passing</li>
 		    <li>Code is PaaS Platform agnostic, it needs correct env variables to be set. Please refer .env.js fore the same.</li>
 		</ul>
 	</li>
</ul>