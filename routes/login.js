var cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser');

var servePublicFiles = require('../utils/servepublicfiles');

/**
 * Handle all routes that are public
 */
module.exports = function(loginApp, rootDir, passport) {

  loginApp.set('views', rootDir + '/views');
  loginApp.set('view engine', 'ejs');
  
  loginApp.use(cookieParser('cookiesecret'))
  .use(bodyParser());

  loginApp.get('/', isAlreadyLoggedIn ,function(req, res) {
    return res.render('index.ejs', {
      message : null,
      env : process.env.NODE_ENV,
    });
  });

  loginApp.get('/auth/facebook', passport.authenticate('facebook', {
    scope : 'email'
  }));
  loginApp.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect : '/profile',
    failureRedirect : '/'
  }));

  loginApp.get('/auth/twitter', passport.authenticate('twitter', {
    scope : 'email'
  }));
  loginApp.get('/auth/twitter/callback', passport.authenticate('twitter', {
    successRedirect : '/profile',
    failureRedirect : '/'
  }));

  loginApp.get('/auth/google', passport.authenticate('google', {
    scope : [ 'profile', 'email' ]
  }));
  loginApp.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect : '/profile',
    failureRedirect : '/'
  }));

  loginApp.get('/login', isAlreadyLoggedIn, function(req, res) {
    return res.render('login.ejs', {
      message : null
    });
  });

  loginApp.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile',
    failureRedirect : '/login',
    failureFlash : true
  }));

  loginApp.get('/signup', isAlreadyLoggedIn, function(req, res) {
    return res.render('signup.ejs', {
      message : null
    });
  });

  loginApp.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile',
    failureRedirect : '/signup',
    failureFlash : true
  }));

  // Handle public resources
  loginApp.get(/\/(libs)|(partials)|(img)|(js)|(jsmin)|(css)\/.+/,
      servePublicFiles.getResource);
};

function isAlreadyLoggedIn(req, res, next){
  if (!req.isAuthenticated())
    return next();  
  console.log('already logged in...');
  res.redirect('/profile');
}