var event = require('../modules/event');
var express = require('express');
var router = express.Router();

router.post('/add',function(req,res){
    data=req.body;
    var events=new event();
    events.name=data.name;
    events.type=data.type;
    events.datetime = data.datetime;

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
                console.log("Event's data is successfully uploaded.");
            }
        })
});


module.exports = router;