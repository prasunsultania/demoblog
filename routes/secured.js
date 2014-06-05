/**
* Handle all routes that are available only after browser login
**/
module.exports = function(app){
	
	app.get('/profile', isLoggedIn, function(req, res) {
		var user = req.user;
		res.render('authindex.ejs', {
			env: process.env.NODE_ENV,
			
			localId: user._id,
			localEmail: user.local.email,
			localPassword: user.local.password,
			
			fbId: user.facebook.id,
			fbToken: user.facebook.token,
			fbEmail: user.facebook.email,
			fbName: user.facebook.name,
			
			tId: user.twitter.id,
			tToken: user.twitter.token,
			tEmail: user.twitter.username,
			tName: user.twitter.displayName,
			
			gId: user.google.id,
			gToken: user.google.token,
			gEmail: user.google.email,
			gName: user.google.name,
		});
	});
	
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();
	
	res.redirect('/');
}