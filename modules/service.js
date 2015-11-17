var mongoose = require('mongoose');
var a=require('./address');
var Address = require('mongoose').model('address').schema;
var category = require('mongoose').model('category').schema;
var bcrypt = require('bcrypt-nodejs');
var Salon = require('mongoose').model('salon').schema;

var schema = mongoose.Schema({
	salonID:{type: mongoose.Schema.Types.ObjectId, ref: 'Salon', sparse:true},
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
	},
	//categoryId:{type: mongoose.Schema.Types.ObjectId,ref:'category', required:true}
});

module.exports=mongoose.model('service',schema);
