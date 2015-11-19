var express = require('express');
var service = require('../modules/service');
var address = require('../modules/address');
var category = require('../modules/category');
var salon = require('../modules/salon');
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

    //serv.categoryId = data.categoryId;

    //serv.category=data.category;

    // to validate the inputted data
    var err = serv.validateSync();
    if(err){
            res.send('Unsuccessful');
            return;
        }
    //to check if there is any technical or syntax error    
    serv.save(function(err){
    if(err){
            res.send("Unsuccessful");
        }
    else{

            console.log("Instance of service schema is successfully uploaded.");

            res.send("Successful");

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
    res.send("Successful");
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
    service.find({ "salonID": salonId }).exec(function(err, data) {
        if (err) throw err;
            res.send(data);
    });
});


router.post('/getSalonByServices',function(req,res,next){
    var services = req.body.services;
    console.log(services);

    var query = service.find({}).where('name').in(services).select('salonID');

    query.exec(function(err,salonIds) {
        if(err) {
            res.json(err);
            return;
        }
        console.log(salonIds);
        var ids = new Array();
        for(var i=0; i < salonIds.length ; i++) {
            ids[i] = salonIds[i]['salonID'];
        }
        console.log(ids);
        var salonQuery = salon.find({}).where('_id').in(ids);
        salonQuery.populate('address').exec(function(err,salons) {
           if(err) {
               res.json(err);
               return;
           }
           res.json(salons); 
        });
    });
});

//delete Service
router.post('/delete',function(req,res){
    data=req.body;
    service.findOneAndRemove({ "_id":data.objectId }, function(err){
        if (err){
            res.send('Unuccessful');
        }
        else{
            res.send('Successful');
        }
    });
});

module.exports = router;