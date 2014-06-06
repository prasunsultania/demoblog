// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var validEmail = require('./helpers/validate/email');

// define the schema for our user model
var userSchema = mongoose.Schema({
	local : {
		email : {type: String, validate: validEmail, lowercase: true},
		password : String,
	},
	facebook : {
		id : String,
		token : String,
		email : {type: String, validate: validEmail, lowercase: true},
		name : String
	},
	twitter : {
		id : String,
		token : String,
		displayName : String,
		username : String
	},
	google : {
		id : String,
		token : String,
		email : {type: String, validate: validEmail, lowercase: true},
		name : String
	}
});

userSchema.methods.registerExistingUser = function(email, password, callback){  
  var user = req.user;
  user.local.email = email;
  user.local.password = user.generateHash(password);
  user.save(function(err) {
    if (err)
      return callback(err);
    return done(null, user);
  });
};

userSchema.statics.registerNewUser = function(email, password, callback){
  var User = this;
  User.findOne({
    'local.email' : email
  }, function(err, user) {
    // if there are any errors, return the error
    if (err){
      return callback(err);
    }
    // check to see if theres already a user with that email
    if (user) {
      return callback(new Error("This user is already taken."));
    } else {
      // create the user
      var newUser = new User();
      newUser.local.email = email;
      newUser.local.password = newUser.generateHash(password);
      newUser.save(function(err, user) {
        if(err){
          console.dir(err);
          return callback(err);
        }        
        return callback(null, newUser);
      });
    }
  });    
};

// generating a hash
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);