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
            res.send(err);
            return;
        }
        
    //to check if there is any technical or syntax error    
    offers.save(function(err){
            if(err){
                res.send("Error");
                console.log(err);
            }
            else{
                res.send("Offer's data is successfully uploaded.");
            }
        })
});

//Get Current Offers
router.post('/getCurrentOffers',function(req,res){
    var now=new Date().toISOString();
    //var now = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
  //  console.log("Date" + now);
    
    offer.find({"startDate": {"$lte": now}, "endDate":{"$gte":now}}, function(err, currentOffers) {
    if (err) throw err;
    res.send(currentOffers);  
  })
});

//Check Stock
router.post('/checkStock',function(req,res){
    data=req.body;
    var objectId=data.objectId;
    offer.find({ "_id": objectId }).exec(function(err, data) {
        if (err) throw err;
        res.send(data);
        });

});

//delete Offer
router.post('/delete',function(req,res){
    data=req.body;
    offer.findOneAndRemove({ "_id":data.objectId }, function(err){
        if (err){
            res.send('Deletion Problem' + err);
        }
        else{
            res.send('Offer Deleted successfully');
        }
    });
});

module.exports = router;