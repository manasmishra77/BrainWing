//Require Mongoose
 mongoose = require('mongoose');

//Define a schema
let Schema = mongoose.Schema;

let CourseModelSchema = new Schema({
    name: String,
    chapters: [{ type: Schema.Types.ObjectId, ref: 'Chapter'}],
    isApproved: Boolean
});

// Compile model from schema
let CourseModel = mongoose.model('Course', CourseModelSchema);



//Define a schema

let ChapterModelSchema = new Schema({
    name: String,
    isCompleted: Boolean,
    isApproved: Boolean
});

// Compile model from schema
let ChapterModel = mongoose.model('Chapter', ChapterModelSchema);

let findCourseById = function(courseId, callback) {
  CourseModel.findById(courseId, function (err, data) {
    if (err){
      callback(false, err, null);
      return;
    }
    if (data) {
      let chapterIds = data["chapters"];
      console.log(chapterIds);
      let chapters = [];
      for(let i=0; i<chapterIds.length; i++) {
      const findChapterIds = findChaptersById(chapterIds[i], function(isSuccess, err, data){
          if (isSuccess == true) {
            chapters.push(data);
          }
        });
      }
      data["chapters"] = chapters;
      callback(true, null, data);
    }

   } );

}
let findChaptersById = function(chapterId, callback) {
ChapterModel.findById(chapterId, function (err, data) {
  if (err){
    callback(false, err, null);
    return;
  }
  if (data) {
    callback(true, null, data);
  }
 });

}

// Compile model from schema
module.exports = {
    CourseModel: CourseModel,
    ChapterModel: ChapterModel,
    findCourseById: findCourseById
  }
