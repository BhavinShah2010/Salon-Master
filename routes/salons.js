var express = require('express');
var router = express.Router();
var salon = require('../modules/salon');
var address = require('../modules/address');
var passport = require('./../auth');
//This library is imported to perform join operation
//var populatePlugin = require('mongoose-power-populate')(mongoose);

/* GET users listing. */
//Get salon detail through its ID
router.post('/getSalon',function(req,res){
  salon.find({_id:req.body.salonId}).populate('address').exec(function(err, salons) {
    if (err) throw err;
    //res.render('home',{salonData:salons, user:req.user, views:req.session.views});
      //res.json(salons);
      res.json(salons);


  })
});
//Get All salon details whose ids are passed
router.post('/getAllSalonsById',function(req,res,next){
	var ids = req.body.salons;
	//var query = salon.find({}).where('_id').in(salons);
	var salonQuery = salon.find({}).where('_id').in(ids);
    salonQuery.populate('address').exec(function(err,salons) {
        if(err) {
               res.json(err);
               return;
        }
        res.json(salons); 
    });
});

//View Single Salon Profile
router.post('/getDetails',function(req,res){
    data=req.body;
    var objectId=data.objectId;
    salon.find({ "_id": objectId }).exec(function(err, data) {
  		if (err) throw err;
  		res.send(data);
		});

});

//refirect to index.js if user is not logged in
/*router.use(function(req,res,next){
*/
/*router.use(function(req,res,next){
  if(!req.user){
    res.redirect('/');
  }
  next();
});



*/
//redirect to Home page
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  //console.log("this is salon");
  res.render('user_profile1',{user:req.user, views:req.session.views});
});


// router.get('/', function(req, res, next) {
//   //res.send('respond with a resource');
//   //console.log("this is salon");
//   res.render('user_profile1',{user:req.user, views:req.session.views});
// });
//redirect to Home page after retrieving all salons data

router.get('/', function(req, res, next) {
  salon.find({}).populate('address').exec(function(err, salons) {
    if (err) throw err;
    //console.log(salons.address)
    var query = category.find({});
    query.exec(function(err,categories){
      res.render('home',{salonData:salons, category:categories, user:req.user, views:req.session.views});  
    })
    
    //res.json(salons);
  })
});


router.get('/profile', function(req, res, next) {
	console.log();
  res.render('shop_profile1',{salonId:req.query.id, msg:req.message, views:req.session.views});
});



// To check username is available or not
router.post('/checkLogin', function(req,res){
	salon.findOne({username:req.body.username},function(err, salons) {
	  if(salons){
	  		console.log(salons.password);
	  		var status=salons.comparePassword(req.body.password);
	  		if(status)
	  			res.json({"username":salons.username,"password":req.body.password,"salonId":salons._id});
	  		else{
	  			res.json({"status":"false"});
	  		}
	  	}
	  	else{
	  		res.json({"status":"false"});
	  	}
	});

});


// To check username is available or not
router.post('/checkUname', function(req,res){
	salon.findOne({username:req.body.username},function(err, salons) {
	  if(salons){
	  		res.json({"status":"false"});
	  	}
	  	else{
	  		res.json({"status":"true"});
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
	// req.checkBody(  
	//   "phoneNo", 
	//   "Enter a valid phone number.").isMobilePhone("en-US");
	// var errors = req.validationErrors();
 //  	if (errors) {
 //    	res.send(errors);
 //    	return;
 //    }
 //    else {
    	
    // normal processing here
    data=req.body;
	var s=new salon();
	s.username=data.username;
	s.password=s.generateHash(data.password);
	s.name=data.name;
	s.owners=data.owners;
	s.ratings=data.ratings;
	s.personsVisited=data.personsVisited;
	s.phoneNo=data.phoneNo;
	s.type = data.type;
	var a=new address();
	a.area=data.area;
	a.city=data.city;
	a.state=data.state;
	a.zipcode=data.zipcode;
	a.latitude=data.latitude;
	a.longitude=data.longitude;
	a.save(function(err){
			if(err){
				res.send('Database error! '+err);
			}
		})
	console.log(s.username+data.username+
	s.password+s.generateHash(data.password)+
	s.name+data.name+s.owners+data.owners+
	s.ratings+data.ratings+s.personsVisited+data.personsVisited+
	s.phoneNo+data.phoneNo+
	a.area+data.area+
	a.city+data.city+
	a.state+data.state+
	+a.zipcode+data.zipcode);
	a.save(function(err){
			if(err){
				res.send('Database error! '+err);
			}
		})
	
	s.address=a;
	s.save(function(err){
			if(err){
				res.send('Database error! '+err);
			}
			else{
				res.send('Instance of salon schema is successfully added');
			}
		})
	});


//Update Salon Details
router.post('/updateProfile',function(req,res){
    data=req.body;
	var a=new address();
	a.area=data.area;
	a.city=data.city;
	a.state=data.state;
	a.latitude=data.latitude;
	a.longitude=data.longitude;
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
  		res.json(data);
		});
});



//get all details of salon


router.get('/getSalons', function(req, res, next) {
  salon.find({}).populate('address').exec(function(err, salons) {
    if (err) throw err;
    //res.render('home',{salonData:salons, user:req.user, views:req.session.views});
  	res.json(salons);
  	//return salons;
  })
});

router.get('/getSalonById', function(req, res, next) {
  
  //console.log(req.query.id);
  salon.find({"_id": req.query.id}).populate('address').exec(function(err, salons) {
    if (err) throw err;
    //res.render('shop_profile1',{salon:salons, user:req.user, views:req.session.views});
  	res.json(salons);
  	//return salons;
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




//delete salon

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