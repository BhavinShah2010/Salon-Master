var express = require('express');
var router = express.Router();
var review = require('../modules/review');

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
	r.save(function(err){
			if(err){
				res.send('Database error! '+err);
			}
			else{
				res.send('Review successfully added');
			}
		})
});



router.post('/delete',function(req,res){
	data=req.body;
	var reviewid=data.review;
	review.findOneAndRemove({ _id:reviewid }, function(err){
  		if (err){
  			res.send('Deletion Problem' + err);
  		}
  		else{
  			res.send('Salon Deleted successfully'+reviewid);
  		}
	});
});


/*
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
*/
module.exports = router;