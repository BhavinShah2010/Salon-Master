var mongoose = require('mongoose');
 var Address=require('mongoose').model('Address').schema;;
var User = require('mongoose').model('User').schema;
var Event = require('mongoose').model('Event').schema;
var Salon = require('mongoose').model('Salon').schema;

var schema = mongoose.Schema({
	user:{type: mongoose.Schema.Types.ObjectId, ref: 'User',required:true},
	salon:{type: mongoose.Schema.Types.ObjectId, ref: 'salon',required:true},
	event:{type: mongoose.Schema.Types.ObjectId, ref: 'Event',required:true},
	serviceslist:[type: mongoose.Schema.Types.ObjectId, ref: 'Address',required:true],
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

module.exports=mongoose.model('Appointment',schema);