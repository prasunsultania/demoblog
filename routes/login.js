var connect = require('connect');
var servePublicFiles = require('../utils/servepublicfiles');
/**
* Handle all routes that are public
**/
module.exports = function(loginApp, rootDir, passport){	
	
	loginApp.set('views', rootDir + '/views');
    loginApp.set('view engine', 'ejs');    	    
    loginApp.use(connect.cookieParser());    	    
    loginApp.use(connect.bodyParser());    
    
    loginApp.get('/', function(req, res){
    	return res.render('index.ejs',{
    		message: null
    	});
    });
    
    loginApp.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    loginApp.get('/auth/facebook/callback',
    	passport.authenticate('facebook', {
			successRedirect : '/profile',
			failureRedirect : '/'
    	})
    );
    
    loginApp.get('/login', function(req, res){
    	return res.render('login.ejs',{
    		message: null    		
    	});
    });
    
    loginApp.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile',
		failureRedirect : '/login',
		failureFlash : true
	}));
    
    loginApp.get('/signup', function(req, res){
    	return res.render('signup.ejs',{
    		message: null    		
    	});
    });
    
    loginApp.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile',
		failureRedirect : '/signup',
		failureFlash : true
	}));                
    
    loginApp.get('/bower_components/*', servePublicFiles.getResource);
    loginApp.get('/img/*', servePublicFiles.getResource);
    loginApp.get('/js/*', servePublicFiles.getResource);
};
