var express = require('express');
var mongoose = require('mongoose'); // Driver for connecting to MongoDB
var passport = require('passport');
var flash = require('connect-flash');

var session = require('express-session'),
  RedisStore = require('connect-redis')(session),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  vhost = require('vhost');

// load env
require('./utils/loadenv')();

var BlogApp = function() {
  var app = express();
  var loginApp = express();
  var securedApp = express();

  // Scope.
  var self = this;

  /**
   * terminator === the termination handler Terminate server on receipt of the
   * specified signal.
   * 
   * @param {string}
   *          sig Signal to terminate on.
   */
  self.terminator = function(sig) {
    if (typeof sig === "string") {
      console.log('%s: Received %s - terminating sample app ...', Date(Date
          .now()), sig);
      process.exit(1);
    }
    console.log('%s: Node server stopped.', Date(Date.now()));
  };

  /**
   * Setup termination handlers (for exit and a list of signals).
   */
  self.setupTerminationHandlers = function() {
    // Process on exit and signals.
    process.on('exit', function() {
      self.terminator();
    });
    [ 'SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT', 'SIGBUS',
        'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM' ]
        .forEach(function(element, index, array) {
          process.on(element, function() {
            self.terminator(element);
          });
        });
  };

  self.logUncaughtExceptions = function() {
    process.on('uncaughtException', function(ex) {
      console.dir(ex);      
    });
  };

  self.initializeServer = function() {
    // without being able to connect to mongoDB app wont start
    mongoose.connect(process.env.MONGO_URI, function(err, db) {
      if (err)
        throw err;

      require('./strategies/passport')(passport);
      
      // required for passport                  
      app.use(bodyParser());
      app.use(cookieParser('optional secret string'));            
      
      app.use(session({
        secret : process.env.SESSION_SECRET,
        store : (new RedisStore({host: process.env.REDISCLOUD_HOST, 
          port: process.env.REDISCLOUD_PORT, 
          pass: process.env.REDISCLOUD_DB_PASS})),
        cookie: {domain : ('.' + process.env.ROOT_DOMAIN)}
      }))
      .use(passport.initialize())
      .use(passport.session())
      .use(flash()); // use connect-flash for flash messages stored in session
      
      require('./routes/login')(loginApp, __dirname, passport);
      require('./routes/secured')(loginApp, __dirname);            

      app.use(vhost('login.localhost.in', loginApp))
      .use(vhost('vast-chamber-5927.herokuapp.com', loginApp))
      .use(vhost('awesomeblog.cloudcontrolapp.com', loginApp))
      .use(vhost('blog-webinvader.rhcloud.com', loginApp))
      .use(vhost('prasun.io', loginApp))
      .use(vhost('www.prasun.io', loginApp))
      .use(vhost('www.prasunsultania.in', loginApp))
      .use(vhost('www.prasunsultania.info', loginApp))
      .use(vhost('prasunsultania.in', loginApp));
      //.use(vhost('localhost.in', securedApp));

      app.listen(process.env.NODEJS_PORT || 
          process.env.OPENSHIFT_NODEJS_PORT || 
          process.env.PORT, process.env.NODEJS_IP || 
          process.env.OPENSHIFT_NODEJS_IP);
      console.log('%s: Node server started on %s:%s ...', Date(Date.now()),
          process.env.NODEJS_IP || 
          process.env.OPENSHIFT_NODEJS_IP || 
          '127.0.0.1', 
          process.env.NODEJS_PORT ||
          process.env.OPENSHIFT_NODEJS_PORT);
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