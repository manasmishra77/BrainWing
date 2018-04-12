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
router.get('/classes', function(req, res, next) {
  ClassModel.getAllClasses(req.body).then(function(data) {
  //  console.log("The class" + " " + data);
    res.status(200).json(data);
  },
  function(error) {
        res.status(401).json(error);
      });
});


module.exports = router;
