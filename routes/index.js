var express = require('express');
var user = require('../modules/User');
var address = require('../modules/Address');
var salon = require('../modules/Salon');
var service = require('../modules/Service');
var offer = require('../modules/Offer');
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

router.post('/_salon',function(req,res){
	data=req.body;
	var _salon=new salon();
	
	_salon.username=data.username;
	_salon.password=data.password;
	_salon.name=data.name;
	_salon.owners=data.owners;
	_salon.description = data.description;
	_salon.ratings = data.ratings;
	_salon.personsVisited = data.personsVisited;
	_salon.phoneNo = data.phoneNo;

	var a=new address();
	a.area=data.area;
	a.city=data.city;
	a.state=data.state;
	a.zipcode=data.zipcode;
	_salon.address=a;
	_salon.save(function(err){
			if(err){
				console.log(err);
			}
			else{
				console.log("Salon entity successfully uploaded.");
			}
		})
});

router.post('/_service',function(req,res){
	data=req.body;
	var _service=new service();
	_service.salonID=data.salonID;
	_service.name=data.name;
	_service.description = data.description;
	_service.price = data.price;
	_service.duration = data.duration;

	_service.save(function(err){
			if(err){
				console.log(err);
			}
			else{
				console.log("Service entity successfully uploaded.");
			}
		})
});

router.post('/_offer',function(req,res){
	data=req.body;
	var _offer=new offer();
	_offer.serviceID=data.serviceID;
	_offer.discount=data.discount;
	_offer.startDate = data.startDate;
	_offer.endDate = data.endDate;
	_offer.count = data.count;
	_offer.description = data.description;
	_offer.save(function(err){
			if(err){
				console.log(err);
			}
			else{
				console.log("Offer entity successfully uploaded.");
			}
		})
});


module.exports = router;
