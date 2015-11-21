var appointment = require('../modules/Appointment');
var userA = require('../modules/user');
var salonA = require('../modules/salon');
var eventA = require('../modules/event');
var serviceA = require('../modules/service');
var gcm = require('node-gcm');
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
                
                //Push Notification GCM
                salonA.find({_id:data.salon}).exec(function(err, salons) {
                    if (err) throw err;
                    else{
                        var device_tokens = [];
                        var message = new gcm.Message();
                        var sender = new gcm.Sender('AIzaSyBiuGydi5Otohq4HQo1BzCm-I8_9cUvcVY');
                        var device_token=salons.deviceId;
                        message.addData('title', 'Appointment Received');
                        message.addData('message', 'New Appointment has been received');
                        message.addData('sound', 'notification');

                        message.collapseKey = 'testing';
                        message.delayWhileIdle = true;
                        message.timeToLive = 3;

                        console.log('sending to: ' + device_token);

                        device_tokens.push(device_token);

                        sender.send(message, device_token, 4, function(result){
                        console.log(result);
                        console.log('push sent to: ' + device_token);
                        });
                        res.json({"response":"success"});
                    }
                })
            }
        })
});

//Get Appointments of a particular User
router.post('/getUserAppointment',function(req,res){
    var userId=req.body.userId;
    appointment.find({ "user": userId }).populate('salon').exec(function(err, data) {
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

//Change Appointment Status
router.post('/changeStatus',function(req,res){
    appointment.findOneAndUpdate({"_id":req.body.objectId}, {status:req.body.status}, function(err, approvedAppointment) {
        if(err) throw err;
        res.send("Successful");
    })
});
/*
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
*/
module.exports = router;