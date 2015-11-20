var mongoose = require('mongoose');
var schema = mongoose.Schema({
	totalPersons:{
		type:Number,
		required:true,
	},
	type:{
		type:String,
		enum:['Funeral','Marriage','Party','General'],
		required:true
	},
	
	datetime:{
		type:Date,
		required:true
	}
});


module.exports=mongoose.model('event',schema);
