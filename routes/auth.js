var express = require('express');
var passport= require('passport');
var user = require('../modules/user');
var router = express.Router();


//login 
router.post('/login',passport.authenticate('local',{
	failureRedirect:'/',
	successRedirect:'/salons/'	
}));


module.exports = router;
