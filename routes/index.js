var express = require('express');
var router = express.Router();
// var user = require('../modules/User');
// var address = require('./../modules/Address');



/* GET home page. */
router.get('/', function(req, res, next) {
	console.log();
  res.render('index', { title: 'Sagar' });
});


module.exports = router;
