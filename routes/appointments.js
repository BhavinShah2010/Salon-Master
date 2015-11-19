var appointment = require('../modules/Appointment');
var userA = require('../modules/user');
var salonA = require('../modules/salon');
var eventA = require('../modules/event');
var serviceA = require('../modules/service');
var express = require('express');
var router = express.Router();

router.post('/add',function(req,res){
    data=req.body;
    var appoint=new appointment();
    appoint.user=data.user;
    appoint.salon=data.salon;
    appoint.event = data.event;
    var temp=data.serviceslist;
    var list=temp.split(',');
    appoint.serviceslist=list;
    console.log(list.toString());
    
    var date=new Date(data.date);
    var time=date.time.toString();
    var time=time.split(':');
    date.setHours(time[0]);
    date.setMinutes(time[1]);
    date.setSeconds(time[2]);
    appoint.time=data.date;

   console.log(date);
    appoint.rating=data.rating;
    appoint.totalprice = data.totalprice;
/*    
    // to validate the inputted data
    var err = appoint.validateSync();
    if(err){
            console.log(err);
            res.send("Validation"+error);
            return;
        }
    
    //to check if there is any technical or syntax error    
    appoint.save(function(err){
            if(err){
                console.log(err);
                res.send("Unsuccessful");
            }
            else{
                res.send("Successful");
            }
        })
    */
    });

//Get Appointments of a particular Salon
router.post('/getSalonAppointment',function(req,res){
    var salonId=req.body.salonId;
    appointment.find({ "salon": salonId }).exec(function(err, data) {
        if (err) throw err;
            res.send(data);
    });
});


//Approve Appointment
router.post('/approveAppointment',function(req,res){
    appointment.findOneAndUpdate({"_id":req.body.objectId}, {status:"approved"}, function(err, approvedAppointment) {
        if(err) throw err;
        res.send("Approved");
    })
});

//Cancelling appontment using ObjectId, parameter will be mongodb objectId
router.post('/cancelAppointment',function(req,res){
    appointment.findOneAndUpdate({"_id":req.body.objectId}, {status:"cancelled"}, function(err, cancelledAppointment) {
        if(err) throw err;
        res.send("Cancelled");
    })
});


//Complete Appointment
router.post('/completeAppointment',function(req,res){
    appointment.findOneAndUpdate({"_id":req.body.objectId}, {status:"completed"}, function(err, completedAppointment) {
        if(err) throw err;
        res.send("Completed");
    })
});

module.exports = router;