/**
 * Handle all routes that are available only after browser login
 */
module.exports = function(app) {

  app.get('/profile', isLoggedIn, function(req, res) {
    var user = req.user;
    res.render('authindex.ejs', {
      env : process.env.NODE_ENV,

      localId : user._id,
      localEmail : user.local.email,
      localPassword : user.local.password,

      fbId : user.facebook.id,
      fbToken : user.facebook.token,
      fbEmail : user.facebook.email,
      fbName : user.facebook.name,

      tId : user.twitter.id,
      tToken : user.twitter.token,
      tEmail : user.twitter.username,
      tName : user.twitter.displayName,

      gId : user.google.id,
      gToken : user.google.token,
      gEmail : user.google.email,
      gName : user.google.name,
    });
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
  
  app.get('/connect/twitter', function(req, res){
    res.redirect('/auth/twitter');
  });
  
  app.get('/connect/facebook', function(req, res){
    res.redirect('/auth/facebook');
  });
  
  app.get('/connect/google', function(req, res){
    res.redirect('/auth/google');
  });
};

function isLoggedIn(req, res, next) {
  console.log(req.cookies);
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();  
  console.log('not logged in...');
  res.redirect('/');
}