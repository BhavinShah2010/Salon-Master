var mongoose = require('mongoose');
var schema = mongoose.Schema({
	latitude:{
		type:Number
	},
	longitude:{
		type:Number
	},
	street:{
		type:String,
		required:true
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
module.exports=mongoose.model('address',schema);
