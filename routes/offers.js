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