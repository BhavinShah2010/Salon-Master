var mongoose = require('mongoose');


var schema = mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	sub_cat:{type:[String]},
	description:{
		type:String,
	}
});

module.exports=mongoose.model('category',schema);