var express = require('express');
var router = express.Router();
var StudentModel = require('../Model/StudentModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
  createStudentModel();
  res.send('respond with a resource');
});

function createStudentModel() {
let newStudent = new StudentModel({ name: 'awesome' });
newStudent.save(function (err) {
  if (err) throw err;

  console.log("saaved!!!");
})
}

module.exports = router;
