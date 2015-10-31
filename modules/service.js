var mongoose = require('mongoose');
<<<<<<< HEAD
=======
var a=require('./address');
var Address = require('mongoose').model('address').schema;
>>>>>>> 817422d87bf736cf768bc27936e172135f0cc096
var bcrypt = require('bcrypt-nodejs');
var Salon = require('mongoose').model('Salon').schema;

var schema = mongoose.Schema({
	salonID:{type: mongoose.Schema.Types.ObjectId, ref: 'Salon'},
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
module.exports=mongoose.model('service',schema);
