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
				res.send('Unsuccessful');
			}
			else{
				res.send('Successful');
			}
		})
});

//Update Review
router.post('/updateReview',function(req,res){
  data=req.body;
  var now=new Date();
  review.findOneAndUpdate({"_id":data.reviewid}, { title:data.title, description:data.description, timestamp:now}, function(err, updatedReview) {
    if (err){
      res.send("Unsuccessful");
    }
    res.send("Successful");
  })
});

//View All Reviews
router.post('/getReviews',function(req,res){
  review.find({}, function(err, reviews) {
    if (err) throw err;
  res.send(reviews);
  })
});

// View Review By SalonID
router.post('/getReviewsBySalon',function(req,res){
    data=req.body;
    var objectId=data.objectId;
    review.find({ "salon": objectId }).populate('user').exec(function(err, data) {
   // review.find({ "salon": objectId }).exec(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
});

router.post('/delete',function(req,res){
	data=req.body;
	review.findOneAndRemove({ _id:data.reviewid }, function(err){
  		if (err){
  			res.send('Unsuccessful');
  		}
  		else{
  			res.send('Successful');
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