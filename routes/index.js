var express = require('express');
var user = require('../modules/User');
var address = require('../modules/Address');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
	console.log();
  res.render('login_master', { title: 'Sagar' });
});


module.exports = router;
