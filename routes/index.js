var express = require('express');
var user = require('../modules/User');
var address = require('./../modules/Address');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
	console.log();
  res.render('index', { title: 'Sagar' });
});


module.exports = router;
