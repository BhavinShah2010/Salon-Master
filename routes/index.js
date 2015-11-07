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


router.get('/login', function(req, res, next) {
	console.log();
  res.render('login_master',{msg:req.message, views:req.session.views});
});


module.exports = router;
