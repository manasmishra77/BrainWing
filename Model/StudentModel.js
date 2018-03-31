//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var StudentModelSchema = new Schema({
    name: String,
    fatherName: String,
    contactNumber: String,
    address: String,
    standard: ClassModel,
    dateOfJoining: Date
    isAStudent: Boolean
});

// Compile model from schema
var StudentModel = mongoose.model('StudentModel', StudentModelSchema);

module.exports = StudentModel
