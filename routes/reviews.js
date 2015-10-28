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


module.exports = router;