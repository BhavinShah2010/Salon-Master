var express = require('express');
var service = require('../modules/service');
var address = require('../modules/address');
var salon = require('../modules/salon');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/add',function(req,res){
    data=req.body;
    var serv=new service();
    serv.salonId=data.salonId;
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

//Update Service
router.post('/updateService',function(req,res){
    data=req.body;
    service.findOneAndUpdate({"_id":data.objectId}, { name: data.name, description:data.description ,price:data.price, duration:data.duration}, function(err, updatedService) {
    if (err) throw err;
    service.find({ "_id": data.objectId}).exec(function(err, finalService) {
    if(err) throw err;
    res.send(finalService);
    })
  })
});

//getServices
router.post('/getServices',function(req,res){
  service.find({}, function(err, services) {
    if (err) throw err;
  res.send(services);
  })
});

//Get service details by entering service name
router.post('/getServiceDetail',function(req,res){
    service.find({"name": req.body.name}).exec(function(err, data) {
        if (err) throw err;
        res.json(data);
        });
});


//View Service
router.post('/getDetails',function(req,res){
    data=req.body;
    var objectId=data.objectId;
    service.find({ "_id": objectId }).exec(function(err, data) {
        if (err) throw err;
        res.send(data);
        });

});

//View Services of a particular Salon
router.post('/getSalonServices',function(req,res){
    data=req.body;
    var salonId=data.salonId;
//    salon.find({ "_id": salonId }).exec(function(err, salonObject) {
//        if (err) throw err;
        service.find({ "salonID": salonId }).exec(function(err, data) {
            if (err) throw err;
            res.send(data);
            
//        });
    });
});

//delete Service
router.post('/delete',function(req,res){
    data=req.body;
    service.findOneAndRemove({ "_id":data.objectId }, function(err){
        if (err){
            res.send('Deletion Problem' + err);
        }
        else{
            res.send('Service Deleted successfully');
        }
    });
});

module.exports = router;