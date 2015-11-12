var express = require('express');
var router = express.Router();

/* GET home page. */

//redirect to login page if not logged in

router.get('/', function(req, res, next) {
	console.log();
  res.render('login_master',{msg:req.message, views:req.session.views});
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



router.get('/login', function(req, res, next) {
	console.log();
  res.render('login_master',{msg:req.message, views:req.session.views});
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
