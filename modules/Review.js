var mongoose = require('mongoose');
// var a=require('./Address');
var User = require('mongoose').model('User').schema;
var Salon = require('mongoose').model('Salon').schema;

var schema = mongoose.Schema({
	user:{type: mongoose.Schema.Types.ObjectId, ref: 'User',required:true},
	salon:{type: mongoose.Schema.Types.ObjectId, ref: 'Salon',required:true},
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

module.exports=mongoose.model('Review',schema);