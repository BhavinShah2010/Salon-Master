var mongoose = require('mongoose');
var a=require('./Address');
var Address = require('mongoose').model('Address').schema;
var bcrypt = require('bcrypt-nodejs');
var schema = mongoose.Schema({
	username:{
		type:String,
		required:true,
		unique:true
	},
	password:{
		type:String,
		required:true
	},
	name:{
		type:String,
		required:true
	},
	owners:{
		type:[String],
		required:true
	},
	address:{type: mongoose.Schema.Types.ObjectId, ref: 'Address'},
	description:{
		type:String,
		
	},
	ratings:{
		type:Number,
		min:0,
		max:5,
		default:0
		},
	personsVisited:{ //number of persons visited and rated salon
		type:Number,
		default:0,
		min:0
	},
	
	phoneNo:{
		type:[Number],
		required:true
	}
});

schema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
schema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password);
};
module.exports=mongoose.model('Salon',schema);
