var express = require('express');
var router = express.Router();
var salon = require('../modules/salon');
var address = require('../modules/address');
var passport = require('./../auth');

/* GET users listing. */

//refirect to index.js if user is not logged in
router.use(function(req,res,next){
  if(!req.user){
    res.redirect('/');
  }
  next();
});

//redirect to Home page
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  //console.log();
  res.render('contactUs',{user:req.user, views:req.session.views});
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

router.post('/login',passport.authenticate('local',{
	failureRedirect:'/',
	successRedirect:'/salons/'
	
}));

router.get('/logout',function(req,res){
	req.logout();
	res.redirect('/');
});

//Add new Salon
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
	s.password=s.generateHash(data.password);
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

//Update Salon Details
router.post('/updateProfile',function(req,res){
    data=req.body;
	var a=new address();
	a.area=data.area;
	a.city=data.city;
	a.state=data.state;
	a.zipcode=data.zipcode;
	var now=new Date();
	salon.findOneAndUpdate({"_id":data.objectId}, { username: data.username, name:data.name, owners: data.owners, address:a, description:data.description , ratings:data.ratings, personsVisited:data.personsVisited, phoneNo:data.phoneNo}, function(err, updatedSalon) {
  	if (err) throw err;
  	salon.find({ "_id": data.objectId}).exec(function(err, finalSalon) {
  	if(err) throw err;
  	res.send(finalSalon);
	})
  })
});

//Change Password
router.post('/changePassword',function(req,res){
	data=req.body;
	var s=new salon();
	s.password=s.generateHash(data.newpassword);
	salon.findOneAndUpdate({"_id":data.objectId, "password":s.generateHash(data.oldpassword)}, {password: s.password}, function(err, data) {
		if(err) throw err;
		//It will not change password if old password is wrong without notifying right now.
		res.send("Done if old password was you entered correct.");
	})
});

//View Profile
router.post('/getDetails',function(req,res){
    data=req.body;
    var objectId=data.objectId;
    salon.find({ "_id": objectId }).exec(function(err, data) {
  		if (err) throw err;
  		res.send(data);
		});

});

//getSalons
router.post('/getSalons',function(req,res){
  salon.find({}, function(err, salons) {
    if (err) throw err;
  res.send(salons);
  })
});

//Update Rating
router.post('/updateRatings',function(req,res){
	salon.find({"_id":req.body.objectId}, function(err, salon1) {
  	if (err) throw err;
  	var oldRatings=salon1.ratings;
  	var oldPersons=salon1.personsVisited;
  	var newRatings=req.body.ratings;
  	var updatedRatings=((oldRatings*oldPersons)+newRatings)/oldPersons+1;
  	salon.findOneAndUpdate({"_id":req.body.objectId}, {ratings:updateRatings, personsVisited:oldPersons+1}, function(err, updatedSalon) {
		if(err) throw err;
		res.send("Ratings updated successfully");
	})
	})
	
});

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