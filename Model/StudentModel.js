//Require Mongoose
var mongoose = require('mongoose');
var ClassModel = require('../Model/ClassModel');

//Define a schema
var Schema = mongoose.Schema;

var StudentModelSchema = new Schema({
    name: String,
    rollNumber: { type: String, unique: true },
    fatherName: String,
    contactNumber: String,
    address: String,
    standard: {type: Schema.Types.ObjectId, ref: 'ClassModel'},
    dateOfJoining: Date,
    isAStudent: Boolean
});



module.exports.enterNewStudent =  function(studentModel, callBack){
  let newStudent = new StudentModel({
    name: studentModel['name'],
    rollNumber: studentModel['rollNumber'],
    fatherName: studentModel['fatherName'],
    contactNumber: studentModel['contactNumber'],
    address: studentModel['address'],
    standard: studentModel['standard'],
    dateOfJoining: Date(),
    isAStudent: studentModel['isAStudent']
 });
 save(function (err) {
   if (err) {
     callBack(false, err, nil);
     return
   }
   console.log("saaved!!! name");
   callBack(true, nil, 200);
 });
}
// Compile model from schema
let studentModel = mongoose.model('StudentModel', StudentModelSchema);

// Compile model from schema
module.exports = {
    studentModel: studentModel
}
