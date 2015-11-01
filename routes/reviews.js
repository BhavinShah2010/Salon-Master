var express = require('express');
var router = express.Router();
var review = require('../modules/Review');


/* GET reviews listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/add',function(req,res){
	//refer : https://github.com/chriso/validator.js#validators

    data=req.body;
	var r=new review();
	r.user=data.user;
	r.salon=data.salon;
	r.title=data.title;
	r.description=data.description;
	r.timestamp=data.timestamp;
	s.save(function(err){
			if(err){
				res.send('Database error! '+err);
			}
			else{
				res.send('Salon successfully added');
			}
		})
	}
});


router.post('/delete',function(req,res){
	data=req.body;
	var uname=data.username;
	salon.findOneAndRemove({ username:uname }, function(err){
  		if (err){
  			res.send('Deletion Problem' + err);
  		}
  		else{
  			res.send('Salon Deleted successfully'+uname);
  		}
	});
});
module.exports = router;