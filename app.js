var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var validator = require('express-validator'); // to validate the data refer : https://booker.codes/input-validation-in-express-with-express-validator/

var session = require('express-session');
//database connection with the system...
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var dburi="mongodb://student:student123@ds035713.mongolab.com:35713/salonmaster";
var db=mongoose.connect(dburi,function(err,res){
  if(err){
    console.log('Error connected to'+dburi+' .'+err);
  }
  else
  {
    console.log('Application is successfully connected to '+dburi);
  }
});
var passport= require('passport');
var LocalStrategy = require('passport-local').Strategy;

mongoose.connection.once('connected',function(){
  console.log("successful")
});

var routes = require('./routes/index');
var users = require('./routes/users');
var salons = require('./routes/salons');
var services = require('./routes/services');
var events = require('./routes/events');
var offers = require('./routes/offers');
var reviews = require('./routes/reviews');
var appointments = require('./routes/appointments');
var auth = require('./routes/auth');
//var user = require('../modules/User');

var app = express();


// test commit
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(validator()); // to validate the input data.


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname, 'public')));
//app.use(session({secret: 'supernova1234567890qwertydontyouworrychild', saveUninitialized: true, resave: true,store: new MongoStore({ mongooseConnection: mongoose.connection })}));

//initialize session middleware
app.use(session({
  secret:'salonMaster',
  resave:true,
  saveUninitialized:false
}));

//passport configuration
app.use(passport.initialize());
app.use(passport.session());

var user = require('./modules/user');
//passport.use(user.createStrategy());
//passport.use(new LocalStrategy(user.authenticate()));

//to verify username and password
/*passport.use(new LocalStrategy(
  function(username, password, done) {
    user.findOne({ username: username }, function(err, users) {
      if (err) { return done(err); }
      if (!users) {
        console.log('Invalid Username');
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!users.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, users);
    });
  }
));
*/
//define serialize and deserialized methods:
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());



app.use(function(req, res, next){
  var err = req.session.error,
      msg = req.session.notice,
      success = req.session.success;

  delete req.session.error;
  delete req.session.success;
  delete req.session.notice;

  if (err) res.locals.error = err;
  if (msg) res.locals.notice = msg;
  if (success) res.locals.success = success;

  next();
});


app.use('/', routes);
app.use('/users', users);
app.use('/salons',salons);
app.use('/services',services);
app.use('/events',events);
app.use('/offers',offers);
app.use('/reviews',reviews);
app.use('/appointments',appointments);
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


// chk test
module.exports = app;