var mongoose = require('mongoose');
var schema = mongoose.Schema({
	latitude:{
		type:Number
	},
	longitude:{
		type:Number
	},
	Street:{
		type:String
	},
	area:{
		type:String,
		required:true
	},
	city:{
		type:String,
		required:true
	},
	state:{
		type:String,
		required:true
	},
	zipcode:{
		type:Number,
		required:true
	}

});
module.exports=mongoose.model('Address',schema);