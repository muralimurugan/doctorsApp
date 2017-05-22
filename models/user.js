var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
	},
	member_type:{
		type:Number
	},
	gender:{
		type:String
	},
	age:{
		type:Number
	},
	reason:{
		type:String
	},
	available_date:{
		type:Date
	},
	start_time:{
		type:String
	},
	end_time:{
		type:String
	},
	department:{
		type:String
	}
});

var User = module.exports = mongoose.model('User', UserSchema);

//var Appointment=module.exports=mongoose.model('Appointment',{user_id:ObjectId});

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByUsername = function(email, callback){
	var query = {email: email};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}