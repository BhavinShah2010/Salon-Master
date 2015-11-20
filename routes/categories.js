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
            res.send("successful");
        }
    });
});

router.post('/updateCategory',function(req,res){
    console.log(req.body);
    // to validate the inputted data
 //   var err = cat.validateSync();
     data=req.body;
    //to check if there is any technical or syntax error    
    category.findOneAndUpdate({"_id":data.objectId}, { name: data.name, sub_cat:data.sub_cat, description: data.description}, function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            console.log("Instance of category schema is successfully updated.");
            res.send("successful");
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


router.get('/checkCategory', function(req,res){
    category.findOne({name:req.query.name},function(err, data) {
      if(data){
            res.send('Category Name is Already Exist');
        }
        else{
            res.send('0');
        }
    });
});

/*router.post('/getAllCategoryById',function(req,res,next){
    var ids = req.body.categoryId;
    //var query = salon.find({}).where('_id').in(salons);
    var salonQuery = salon.find({}).where('_id').in(ids);

    salonQuery.populate('address').exec(function(err,salons) {
        if(err) {
               res.json(err);
               return;
        }
        res.json(salons); 
    });
});*/


module.exports = router;    