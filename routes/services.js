var express = require('express');
var service = require('../modules/Service');
var address = require('../modules/Address');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/add',function(req,res){




    data=req.body;
    var serv=new service();
    serv.salonID=data.salonID;
    serv.name=data.name;
    serv.description = data.description;
    serv.price = data.price;
    serv.duration = data.duration;

    // to validate the inputted data
    var err = serv.validateSync();
    if(err){
            console.log(err);
            return;
        }
        
    //to check if there is any technical or syntax error    
    serv.save(function(err){
        if(err){
            console.log(err);
        }
    else{
            console.log("Service's data is successfully uploaded.");
        }
    });    
});

module.exports = router;