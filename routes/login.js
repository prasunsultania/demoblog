var connect = require('connect');
var servePublicFiles = require('../utils/servepublicfiles');
/**
* Handle all routes that are public
**/
module.exports = function(loginApp, rootDir){	
	
	loginApp.set('views', rootDir + '/views');
    loginApp.set('view engine', 'ejs');    	    
    loginApp.use(connect.cookieParser());    	    
    loginApp.use(connect.bodyParser());    
    
    loginApp.get('/', function(req, res){
    	return res.render('index.ejs',{
    		message: null    		
    	});
    });
    
    loginApp.get('/login', function(req, res){
    	return res.render('login.ejs',{
    		message: null    		
    	});
    });
    
    loginApp.get('/signup', function(req, res){
    	return res.render('signup.ejs',{
    		message: null    		
    	});
    });
    
    loginApp.get('/bower_components/*', servePublicFiles.getResource);
    loginApp.get('/img/*', servePublicFiles.getResource);
    loginApp.get('/js/*', servePublicFiles.getResource);
};