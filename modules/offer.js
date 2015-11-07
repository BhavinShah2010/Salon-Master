var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Service = require('mongoose').model('service').schema;
var schema = mongoose.Schema({
	serviceID:{type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true},
	discount:{type: Number},// (discount will be offered in percentage).
	
	startDate:{
		type:Date,
		required:true
		},
	endDate: Date,
	count: Number,
	description:{
		type:String,
		}
});

module.exports=mongoose.model('offer',schema);
