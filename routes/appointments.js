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

    var list = data.serviceslist.split(",");
    appoint.serviceslist =list;

    var date=new Date(data.date);
    var temp=data.timestamp.toString();
    var time=temp.split(':');
    date.setHours(time[0]);
    date.setMinutes(time[1]);
    date.setSeconds(time[2]);
    appoint.time=date;
    appoint.rating=data.rating;
    appoint.totalprice = data.totalprice;
    
    // to validate the inputted data
    var err = appoint.validateSync();
    if(err){
            console.log(err);
            res.send("Validation"+err);
            return;
        }

    if(data.isEvent=="true"){
        var newEvent=new eventA();
        newEvent.totalPersons=data.totalPersons;
        newEvent.type=data.eventType;
        newEvent.datetime=date;
        newEvent.save(function(err){
            if(err){
                console.log(err);
                res.send("Error in Event Data");
            }
        })
        appoint.event=newEvent._id;
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
    });

//Get Appointments of a particular User
router.post('/getUserAppointment',function(req,res){
    var userId=req.body.userId;
    appointment.find({ "user": userId }).exec(function(err, data) {
        if (err) throw err;
            res.send(data);
    });
});

//Get Appointments of a particular Salon
router.post('/getSalonAppointment',function(req,res){
    var salonId=req.body.salonId;
    appointment.find({ "salon": salonId }).exec(function(err, data) {
        if (err) throw err;
            res.send(data);
    });
});

//Delay Appointment
router.post('/delayAppointment',function(req,res){
    var date=new Date(req.body.date);
    var temp=req.body.time.toString();
    var time=temp.split(':');
    date.setHours(time[0]);
    date.setMinutes(time[1]);
    date.setSeconds(time[2]);
    appointment.findOneAndUpdate({"_id":req.body.objectId}, {time:date}, function(err, delayedAppointment) {
        if(err) throw err;
        res.send("Successful");
    })
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