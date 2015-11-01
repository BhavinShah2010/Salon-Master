<<<<<<< HEAD
var express = require('express');
var router = express.Router();
var review = require('../modules/Review');


/* GET reviews listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/add',function(req,res){
	//refer : https://github.com/chriso/validator.js#validators

    data=req.body;
	var r=new review();
	r.user=data.user;
	r.salon=data.salon;
	r.title=data.title;
	r.description=data.description;
	r.timestamp=data.timestamp;
	s.save(function(err){
			if(err){
				res.send('Database error! '+err);
			}
			else{
				res.send('Salon successfully added');
			}
		})
	}
});


router.post('/delete',function(req,res){
	data=req.body;
	var uname=data.username;
	salon.findOneAndRemove({ username:uname }, function(err){
  		if (err){
  			res.send('Deletion Problem' + err);
  		}
  		else{
  			res.send('Salon Deleted successfully'+uname);
  		}
	});
});
=======
var event = require('../modules/Event');
var express = require('express');
var router = express.Router();

router.post('/events',function(req,res){
    data=req.body;
    var events=new event();
    events.user=data.user;
    events.salon=data.salon;
    events.title = data.title;
    events.description=data.description;
    events.timestamp = data.timestamp;
    
    // to validate the inputted data
    var err = events.validateSync();
    if(err){
            console.log(err);
            return;
        }
        
    //to check if there is any technical or syntax error    
    events.save(function(err){
            if(err){
                console.log(err);
            }
            else{
                console.log("Review entity successfully uploaded.");
            }
        })
});


>>>>>>> 32490bea3e14274a31b349821e37e84383cbbc66
module.exports = router;