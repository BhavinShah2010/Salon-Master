var mongoose = require('mongoose');
// var a=require('./Address');
var User = require('mongoose').model('user').schema;
var Salon = require('mongoose').model('salon').schema;

var schema = mongoose.Schema({
<<<<<<< HEAD
	user:{type: mongoose.Schema.Types.ObjectId, ref: 'User',required:true},
	salon:{type: mongoose.Schema.Types.ObjectId, ref: 'Salon',required:true},
=======
	user:{type: mongoose.Schema.Types.ObjectId, ref: 'user',required:true},
	salon:{type: mongoose.Schema.Types.ObjectId, ref: 'salon',required:true},
>>>>>>> 817422d87bf736cf768bc27936e172135f0cc096
	title:{
		type:String,
		required:true
	},
	description:{
		type:String
	},
	timestamp:{
		type:Date,
		default:Date.now
	}
});

module.exports=mongoose.model('review',schema);
