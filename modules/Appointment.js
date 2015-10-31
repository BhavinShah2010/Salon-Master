var mongoose = require('mongoose');
// var a=require('./Address');
var User = require('mongoose').model('user').schema;
var Event = require('mongoose').model('event').schema;
var Salon = require('mongoose').model('salon').schema;

var schema = mongoose.Schema({
	user:{type: mongoose.Schema.Types.ObjectId, ref: 'user',required:true},
	salon:{type: mongoose.Schema.Types.ObjectId, ref: 'salon',required:true},
	event:{type: mongoose.Schema.Types.ObjectId, ref: 'event',required:true},
	serviceslist:[type: mongoose.Schema.Types.ObjectId, ref: 'address',required:true],
	time:{
		type:Date,
		required:true
	},
	status:{
		type:String,
		enum:['completed','canceled','approved','pending']		
	},
	rating:{
		type:Number,
		min:0,
		max:5,
		default:0
	},
	totalprice:{
		type:Number,
		min:0,
		default:0
	}
});

module.exports=mongoose.model('appointment',schema);