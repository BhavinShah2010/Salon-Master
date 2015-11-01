var mongoose = require('mongoose');

 var Address=require('mongoose').model('address').schema;;
var User = require('mongoose').model('user').schema;
var Event = require('mongoose').model('event').schema;
var Salon = require('mongoose').model('salon').schema;

// var a=require('./Address');
var User = require('mongoose').model('user').schema;
var Event = require('mongoose').model('event').schema;
var Salon = require('mongoose').model('salon').schema;


var schema = mongoose.Schema({
	user:{type: mongoose.Schema.Types.ObjectId, ref: 'user',required:true},
	salon:{type: mongoose.Schema.Types.ObjectId, ref: 'salon',required:true},
	event:{type: mongoose.Schema.Types.ObjectId, ref: 'event',required:true},
	serviceslist:[{type: mongoose.Schema.Types.ObjectId, ref: 'service',required:true}],
	time:{
		type:Date,
		required:true,
		default:Date.now
	},
	status:{
		type:String,
		enum:['completed','canceled','approved','pending'],
		default:'pending'
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
