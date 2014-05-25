demoproject
===========

[![Build Status](https://travis-ci.org/prasunsultania/demoblog.svg?branch=master)](https://travis-ci.org/prasunsultania/demoblog)
[![Coverage Status](https://img.shields.io/coveralls/prasunsultania/demoblog.svg)](https://coveralls.io/r/prasunsultania/demoblog)
[![Requirements Status](https://requires.io/github/prasunsultania/demoblog/requirements.png?branch=master)](https://requires.io/github/prasunsultania/demoblog/requirements/?branch=master)


If you are willing to setup a server using MEAN stack, You might find this repository useful.

Special thanks to scoth.io for providing code examples, many part of this code is inspired from it.

I am trying to create a demo blog project using mongoDB, nodejs and Angularjs. 
Focusing on TDD, CI, MEAN stack and keeping front-end and back-end decoupled of each other

Overview:
I have tried keeping front-end and back-end independent of each other. 
Public pages(that does not require login - signin, signup) are served using ejs, 
rest all part of the front end is single page app using Angularjs.
Tech Stack is going to be very MEAN - MongoExpressAngularNode  

Backend:
 PL: Node.js (see package.json for complete dependencies)
 DB: MongoDB and Reddis(for cache and session persistence)
 
BackEnd testing: 
 Unit tests: Mocha, Karma, Chai, Sinon and OpenSauce
 Code Coverage: Istanbul

FrontEnd:
 Framework: Angularjs 
 Unit tests: Mocha, Karma, Chai, Sinon and OpenSauce
 Coverage: Istanbul
 E2E: Protractor/WebDriverJS  
 
CI:
 Travis CI
 
 Right now code is deployed on Openshift, but aim is to keep it platform agnostic
 
Getting Started:
 TBD
