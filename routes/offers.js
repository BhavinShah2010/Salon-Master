var offer = require('../modules/offer');
var express = require('express');
var router = express.Router();

router.post('/add',function(req,res){
    data=req.body;
    var offers=new offer();
    offers.serviceID=data.serviceID;
    offers.discount=data.discount;
    offers.startDate = data.startDate;
    offers.endDate = data.endDate;
    offers.count = data.count;
    offers.description = data.description;

    // to validate the inputted data
    var err = offers.validateSync();
    if(err){
            console.log(err);
            return;
        }
        
    //to check if there is any technical or syntax error    

    offers.save(function(err){
            if(err){
                console.log(err);
            }
            else{
                console.log("Offer's data is successfully uploaded.");
            }
        })
});

router.post('/checkStock',function(req,res){
    offer.findOne({username:req.query.username},function(err, salons) {
      if(salons){
            res.send('Username not Available');
        }
        else{
            res.send('Available');
        }
    });
});

router.post('/delete',function(req,res){
    data=req.body;
    var objectId=data.objectId;
    offer.remove(
            {_id: new mongodb.ObjectID( objectId) }, 
            function (err, result){ 
               res.send('Deletion Error');
              })
});

module.exports = router;