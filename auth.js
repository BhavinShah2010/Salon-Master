var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;
var user=require('./modules/user');
passport.use(new LocalStrategy({passReqToCallback : true},

	function(req,username, password, done) {
		// code for register user
		// var u=new user();
		// u.username="admin2@mysite.com";
		// u.password=u.generateHash("123456");
		// u.save(function(err,res){
		// 	if(err){
		// 		console.log(err);
		// 	}
		// 	else{

		// 	}
		// })
		console.log(username);
		user.findOne({username:username},function(err,user){
			console.log(user);
			if(err){
				console.log(err);
				return done(null, false);
			}
			else{
				if(!user){
					return done(null, false,  { message: 'Incorrect username.' });
				}
				if(!user.validPassword(password)){
					return done(null, false, { message: 'Incorrect password.'});
				}
				else{
					return done(null,user);
				}
				
			}
		})
		
	}
));

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

    // used to deserialize the user
passport.deserializeUser(function(id, done) {
	user.findById(id, function(err, user) {
	done(err, user);
});

});
module.exports = passport;