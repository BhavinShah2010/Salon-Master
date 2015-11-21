var express = require('express');
var router = express.Router();
var salon = require('../modules/salon');
var category = require('../modules/category');
var nodemailer=require('nodemailer');


/* GET home page. */

//redirect to login page if not logged in


router.post('/contact', function(req, res, next) {
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'noreply.salonmaster@gmail.com', // Your email id
      pass: 'salon123' // Your password
      }
    });

    

    var mailOptions = {
      from: 'noreply.salonMaster@gmail.com', // sender address
      to: 'noreply.salonMaster@gmail.com', // list of receivers
      subject: "New Inquiry", // Subject line
      html: '<tr><td>Name</td><td>'+req.body.name+'</td></tr><tr><td>Email:</td><td>'+req.body.email+'</td></tr><tr><td>Subject:</td><td>'+req.body.subject+'</td></tr><tr><td>Description:</td><td>'+req.body.description+'</td></tr>' // You can choose to send an HTML body instead
      };

    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        res.send('Unsuccessful Email');
      }else{
        res.send('Successful');
        }
      })
});

//altaf Testing


router.get('/admin', function(req, res, next) {
  console.log();
  res.render('Admin');
});

//testing end

router.get('/', function(req, res, next) {
    salon.find({}).populate('address').exec(function(err, salons) {
    if (err) throw err;
    //console.log(salons.address)
    var query = category.find({});
    query.exec(function(err,categories){
      res.render('home',{salonData:salons, locatn: true, category:categories, user:req.user, views:req.session.views});  
    })
    
    //res.json(salons);
  })
});

router.get('/home', function(req, res, next) {
    salon.find({}).populate('address').exec(function(err, salons) {
    if (err) throw err;
    //console.log(salons.address)
    var query = category.find({});
    query.exec(function(err,categories){
      res.render('home',{salonData:salons, locatn: true, category:categories, user:req.user, views:req.session.views});  
    })
    
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


router.get('/map', function(req, res, next) {
  console.log();
  res.render('map');
});
router.get('/shop_profile', function(req, res, next) {
  console.log();
  res.render('shop_profile1');
});
router.get('/login', function(req, res, next) {
	console.log();
  res.render('login_master');
});
router.get('/appointment', function(req, res, next) {
  console.log();
  res.render('Appointment');
});

module.exports = router;
