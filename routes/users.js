var express = require('express');
var router = express.Router();
var user = require('../modules/user');
var address = require('../modules/address');
var passport = require('./../auth');

//Register new User
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

//Login
router.post('/login',passport.authenticate('local',{
	failureRedirect:'/',
	successRedirect:'/salons/'
	
}));

//Logout
router.get('/logout',function(req,res){
	req.logout();
	res.redirect('/');
});

//View Profile
router.post('/getDetails',function(req,res){
    data=req.body;
    var objectId=data.objectId;
    user.find({ "_id": objectId }).exec(function(err, data) {
  		if (err) throw err;
  		res.send(data);
		});

});

//Update Profile
//Pending task - Validating data at the time of updation
router.post('/updateProfile',function(req,res){
	/*req.checkBody(
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
  */data=req.body;
	var a=new address();
	a.area=data.area;
	a.city=data.city;
	a.state=data.state;
	a.zipcode=data.zipcode;
	var now=new Date();
	user.findOneAndUpdate({"_id":data.objectId}, { username: data.username, name:data.name, active:true, address:a, modified:now , gender:data.gender, email: data.email, phno:data.phno}, function(err, updatedUser) {
  	if (err) throw err;
  	user.find({ "_id": data.objectId}).exec(function(err, finaluser) {
  	if(err) throw err;
	})
  })
//  }
});

//active account
router.post('/activateUser',function(req,res){
	var now=new Date();
	user.findOneAndUpdate({"_id":req.body.objectId}, {active:true, modified:now}, function(err, activeUser) {
		if(err) throw err;
		res.send("Activated");
	})
});

//deactive Account
router.post('/deactivateUser',function(req,res){
	var now=new Date();
	user.findOneAndUpdate({"_id":req.body.objectId}, {active:false, modified:now}, function(err, deactiveUser) {
		if(err) throw err;
		res.send("Deactivated");
	})
});

//Change Password
router.post('/changePassword',function(req,res){
	data=req.body;
	var u=new user();
	u.password=u.generateHash(data.newpassword);
	var now=new Date();
	user.findOneAndUpdate({"_id":data.objectId, "password":u.generateHash(data.oldpassword)}, {password: u.password}, function(err, data) {
		if(err) throw err;
		//It will not change password if old password is wrong without notifying right now.
		res.send("Done if old password was you entered correct.");
	})
});


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
	  		res.send('Available');
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



module.exports = router;
