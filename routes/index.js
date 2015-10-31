var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log();
  res.render('login_master', { title: 'Sagar' });
});


module.exports = router;
