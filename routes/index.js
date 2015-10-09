var express = require('express');
var user = require('../modules/User');
var address = require('../modules/Address');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
	console.log();
  res.render('index', { title: 'Express' });
});

router.post('/u',function(req,res){
	data=req.body;
	var u=new user();
	u.name=data.name;
	u.username=data.username;
	u.password=data.password;
	u.gender=data.gender;
	u.email=data.email;
	u.phno=data.phno;
	var a=new address();
	a.area=data.area;
	a.city=data.city;
	a.state=data.state;
	a.zipcode=data.zipcode;
	u.address=a;
	u.save(function(err){
			if(err){
				console.log(err);
			}
			else{
				console.log("successfull");
			}
		})
});


module.exports = router;
