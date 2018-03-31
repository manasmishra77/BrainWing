//Require Mongoose
var mongoose = require('mongoose');


//Define a schema
var Schema = mongoose.Schema;

var ClassModelSchema = new Schema({
    standard: String,
    sections: [String],
    course: [Course],
});

// Compile model from schema
var ClassModel = mongoose.model('ClassModel', ClassModelSchema);

module.exports = ClassModel
