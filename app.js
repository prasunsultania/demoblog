var env = require('./.env.js');

Object.keys(env).forEach(function(key){
	process.env[key] = env[key];
});

var express = require('express');
var mongoose = require('mongoose'); // Driver for connecting to MongoDB
var connect = require('connect');

var BlogApp = function() {
	var app = express();
	var loginApp = express();
	var securedApp = express();

    //  Scope.
    var self = this;    

    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function(sig){
        if (typeof sig === "string") {
           console.log('%s: Received %s - terminating sample app ...',
                       Date(Date.now()), sig);
           process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function(){
        //  Process on exit and signals.
        process.on('exit', function() { self.terminator(); });
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() { self.terminator(element); });
        });
    };
    
    self.logUncaughtExceptions = function(){
    	process.on('uncaughtException' , function(ex){
    		console.dir(ex);
    	});
    }

    self.initializeServer = function() {
    	//without being able to connect to mongoDB app wont start
    	mongoose.connect(process.env.MONGO_URI, function(err, db) {
    	    "use strict";    	        	    
    	    if(err) throw err;     	       	        	        	        	        	      	    
    	    require('./routes/login')(loginApp, __dirname);
    	    
    	    app
    	    .use(connect.vhost('login.localhost.in', loginApp))
    	    .use(connect.vhost('blog-webinvader.rhcloud.com', loginApp))
    	    .use(connect.vhost('prasun.io', loginApp))
    	    .use(connect.vhost('www.prasun.io', loginApp))
    	    .use(connect.vhost('www.prasunsultania.in', loginApp))
    	    .use(connect.vhost('www.prasunsultania.info', loginApp))
    	    .use(connect.vhost('prasunsultania.in', loginApp))
    	    .use(connect.vhost('localhost.in', securedApp));    	    
    	    
    	    app.listen(process.env.NODEJS_PORT, process.env.NODEJS_IP);
    	    console.log('%s: Node server started on %s:%s ...', Date(Date.now()), process.env.NODEJS_IP, process.env.NODEJS_PORT);    	    
    	});
    };


    self.initialize = function(callback) {
    	self.logUncaughtExceptions();
        self.setupTerminationHandlers();        
        self.initializeServer();
    };    

};

var blogApp = new BlogApp();
blogApp.initialize();