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
            res.send("Unsuccessful");
            return;
        }
    //to check if there is any technical or syntax error    
    events.save(function(err){
            if(err){
                res.send("Unsucessful");
            }
            else{
                res.send("Successful");
            }
        })
});


module.exports = router;