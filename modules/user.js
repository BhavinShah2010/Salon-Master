var mongoose = require('mongoose');
var a=require('./address');
var Address = require('mongoose').model('address').schema;
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
		type:String
	},
	modified:{
		type:Date,
		default:Date.now
	},
	active:{
		type:Boolean,
		default:false
	},
	address:{type: mongoose.Schema.Types.ObjectId, ref: 'address'},
	gender:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true
	},
	phno:{
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
module.exports=mongoose.model('user',schema);