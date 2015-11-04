var express = require('express');
var router = express.Router();
var user = require('../modules/user');
var address = require('../modules/address');
var passport = require('./../auth');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('contactUs');
});

// To check username is available or not
router.get('/checkUname', function(req,res){
	user.findOne({username:req.query.username},function(err, users) {
	  if(users){
	  		res.send('Username not Available');
	  	}
	  	else{
	  		res.send('0');
	  	}
	});
});


router.post('/login',passport.authenticate('local',{
	failureRedirect:'/',
	successRedirect:'/users/'
	
}));

router.get('/logout',function(req,res){
	req.logout();
	res.redirect('/');
});


router.post('/add',function(req,res)
{
	//refer : https://github.com/chriso/validator.js#validators
	req.checkBody(  
	  "phno", 
	  "Enter a valid phone number.").isMobilePhone("en-US");

	req.checkBody(  
	  "email", 
	   "Enter a valid Email").isEmail();

	req.checkBody(  
	  "gender",
	  "Enter a valid Gender"
	).isIn(['Male','Female','Other','male','female','other']);


	req.checkBody(  
	  "zipcode",
	  "Enter a valid zipcode").isNumeric();

	var errors = req.validationErrors();
  	if (errors) {
    	res.send(errors);
    	return;
    } else {
    // normal processing here

     data=req.body;
	var u=new user();
	u.name=data.name;
	u.username=data.username;
	u.password=u.generateHash(data.password);
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
				res.send('Database error! '+err);
			}
			else{
				res.send('user successfully added');
			}
		})
  }
});

module.exports = router;
