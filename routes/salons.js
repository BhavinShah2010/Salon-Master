var express = require('express');
var salon = require('../modules/salon');
var address = require('../modules/Address');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/add',function(req,res)
{
	//refer : https://github.com/chriso/validator.js#validators
	req.checkBody(  
	  "phoneNo", 
	  "Enter a valid phone number.").isMobilePhone("en-US");


	var errors = req.validationErrors();
  	if (errors) {
    	res.send(errors);
    	return;
  } else {
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
				res.send('user successfully added');
			}
		})
  }
});


module.exports = router;
