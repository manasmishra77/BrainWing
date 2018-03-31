//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var CourseModelSchema = new Schema({
    name: String,
    chapters: [ChapterModel]
    isApproved: Boolean
});

// Compile model from schema
var CourseModel = mongoose.model('CourseModel', CourseModelSchema);

module.exports = CourseModel


//Define a schema

var ChapterModelSchema = new Schema({
    name: String,
    isCompleted: Boolean
    isApproved: Boolean
});

// Compile model from schema
var ChapterModel = mongoose.model('ChapterModel', ChapterModelSchema);

module.exports = ChapterModel
