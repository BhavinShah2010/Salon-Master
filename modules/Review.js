var mongoose = require('mongoose');
// var a=require('./Address');
var User = require('mongoose').model('user').schema;
var Salon = require('mongoose').model('salon').schema;

var schema = mongoose.Schema({
	user:{type: mongoose.Schema.Types.ObjectId, ref: 'user',required:true},
	salon:{type: mongoose.Schema.Types.ObjectId, ref: 'salon',required:true},
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
