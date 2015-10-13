var mongoose = require('mongoose');
var a=require('./Address');
var Address = require('mongoose').model('Address').schema;
var bcrypt = require('bcrypt-nodejs');
var schema = mongoose.Schema({
	salonID:{
		type:String,
		required:true,
		unique:true
	},
	name:{
		type:String,
		required:true
	},
	description:{
		type:String,
	},
	price:{
		type:Number,
		required:true	
		},
	duration:{ //Time service takes (in mins).
		type:Number,
		required:true
	}
});

schema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
schema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password);
};
module.exports=mongoose.model('Service',schema);
