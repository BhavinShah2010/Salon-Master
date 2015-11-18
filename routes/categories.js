var express = require('express');
var category = require('../modules/category');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/add',function(req,res){
    console.log(req.body);
    data=req.body;
    var cat=new category();
    cat.name=data.name;
    cat.sub_cat = data.sub_cat;
    cat.description = data.description;
    console.log(data.name);
    // to validate the inputted data
    var err = cat.validateSync();

    //to check if there is any technical or syntax error    
    cat.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("Instance of category schema is successfully uploaded.");
        }
    });
});


router.get('/getAllCategories',function(req,res,next){
    var query = category.find({});

    query.exec(function(err,categories) {
        if(err) {
            res.json(err);
            return;
        }
        res.json(categories);
    });
});    

module.exports = router;    