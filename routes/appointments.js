var appointment = require('../modules/Appointment');
var userA = require('../modules/User');
var salonA = require('../modules/Salon');
var eventA = require('../modules/Event');
var express = require('express');
var router = express.Router();

router.post('/add',function(req,res){
    data=req.body;
    var appoint=new appointment();
    appoint.user=data.user;
    appoint.salon=data.salon;
    appoint.event = data.event;
    appoint.servicesList=data.servicesList;
    appoint.time = data.time;
    appoint.status = data.status;
    appoint.rating=data.rating;
    appoint.totalprice = data.totalprice;
    
    // to validate the inputted data
    var err = appoint.validateSync();
    if(err){
            console.log(err);
            return;
        }
        
    //to check if there is any technical or syntax error    
    appoint.save(function(err){
            if(err){
                console.log(err);
            }
            else{
                console.log("Appointment's data is successfully uploaded.");
            }
        })
});

module.exports = router;