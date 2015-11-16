var express = require('express');
var router = express.Router();
var salon = require('../modules/salon');


/* GET home page. */

//redirect to login page if not logged in

router.get('/', function(req, res, next) {
	console.log();
  res.render('login_master');
});

router.get('/contact', function(req, res, next) {
  console.log();
  res.render('contactUs');
});

router.get('/home', function(req, res, next) {
    salon.find({}).populate('address').exec(function(err, salons) {
    if (err) throw err;
    console.log(salons.address)
    res.render('home',{salonData:salons, user:req.user, views:req.session.views});
    //res.json(salons);
  })
});


router.get('/failure', function(req, res, next) {
	//console.log('Invalid username or password');
  res.render('login_master',{msg:'Invalid Username or password', views:req.session.views});
});

router.get('/contactUs', function(req, res, next) {
  console.log();
  res.render('contactUs');
});
router.get('/user_profile', function(req, res, next) {
  console.log();
  //res.render('contactUs');
   res.render('user_profile',{msg:req.message, views:req.session.views});
});


router.get('/map', function(req, res, next) {
  console.log();
  res.render('map');
});

router.get('/login', function(req, res, next) {
	console.log();
  res.render('login_master');
});
router.get('/saloneP', function(req, res, next) {
	console.log();
  res.render('shop_profile1',{msg:req.message, views:req.session.views});
});

router.get('/shop_profile', function(req, res, next) {
	console.log();
  res.render('shop_profile');
});


module.exports = router;
