var mongoose = require('mongoose');
var schema = mongoose.Schema({
	name:{ 		// event name
		type:String,
		required:true,
	},
	type:{
		type:String,
		enum:['Funeral','Marriage','Party','general'], //
		required:true
	},
	
	datetime:{
		type:Date,
		required:true
	}

});


module.exports=mongoose.model('event',schema);
