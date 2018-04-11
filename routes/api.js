var express = require('express');
var router = express.Router();
let StudentModel = require('../Model/StudentModel');
let ClassModel = require('../Model/ClassModel');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/newstudent', function(req, res, next){

});

router.post('/addclass', function(req, res, next){
  ClassModel.createNewClass(req.body, function(isSuccess, err, code){
    if (isSuccess == false) {
      res.status(401).json(err);
    }
    res.status(200).json("Created");
  });

});
router.get('/classes', function(req, res, next){
  ClassModel.getAllClasses(function(isSuccess, err, data){
    if (isSuccess == false) {
      res.json({"code": 400, "status": "Error", "error": err});
    }
    res.json({"code": 200, "status": "Success", "data": data});
  });

});


module.exports = router;
