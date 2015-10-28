var express = require('express');
var router = express.Router();
// var salon = require('../modules/salon');
// var address = require('../modules/Address');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// To check username is available or not
router.get('/checkUname', function(req,res){
	salon.findOne({username:req.query.username},function(err, salons) {
	  if(salons){
	  		res.send('Username not Available');
	  	}
	  	else{
	  		res.send('Available');
	  	}
	});
});

router.post('/add',function(req,res){
	//refer : https://github.com/chriso/validator.js#validators
	req.checkBody(  
	  "phoneNo", 
	  "Enter a valid phone number.").isMobilePhone("en-US");
	var errors = req.validationErrors();
  	if (errors) {
    	res.send(errors);
    	return;
    }
    else {
    // normal processing here

    data=req.body;
	var s=new salon();
	s.username=data.username;
	s.password=data.password;
	s.name=data.name;
	s.email=data.email;
	s.owners=data.owners;
	s.ratings=data.ratings;
	s.personsVisited=data.personsVisited;
	s.phoneNo=data.phoneNo;
	var a=new address();
	a.area=data.area;
	a.city=data.city;
	a.state=data.state;
	a.zipcode=data.zipcode;
	s.address=a;
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