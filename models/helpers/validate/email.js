var validator = require('email-validator');

module.exports = function (email) {	
	if(!email) return true;
	return validator.validate(email);
}
