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

let findCourseById = function(courseId) {
   let newPromise = new Promise(function(resolve, error) {
     CourseModel.findById(courseId, function (err, data) {
       if (err){
         error(err);
         return;
       }
       if (data) {
         let chapterIds = data["chapters"];
         console.log(chapterIds);
         let chapters = [];
         for(let i=0; i<chapterIds.length; i++) {
        findChaptersById(chapterIds[i]).then(function(data) {
          console.log("The chapter previous" + chapters);
              chapters.push(data);
            },
            function(error) {
                  console.log(error);
                });
         }
         console.log("The chapter" + chapters);
         data["chapters"] = chapters;
         resolve(data);
       }
      });
   });
   return newPromise;
}

let findChaptersById = function(chapterId) {
  let newPromise = new Promise(function(resolve, error) {
    ChapterModel.findById(chapterId, function (err, data) {
      if (err) {
        error(err);
        return;
      }
      if (data) {
        resolve(data);
      }
     });
  });
   return newPromise;
// ChapterModel.findById(chapterId, function (err, data) {
//   if (err){
//     callback(false, err, null);
//     return;
//   }
//   if (data) {
//     callback(true, null, data);
//   }
//  });

}

// let findChaptersByIdPromise = new Promise((resolve, error) => {
//   ChapterModel.findById(chapterId, function (err, data) {
//     if (err){
//       error(false, err, null);
//       return;
//     }
//     if (data) {
//       resolve(true, null, data);
//     }
//    });
// });

// Compile model from schema
module.exports = {
    CourseModel: CourseModel,
    ChapterModel: ChapterModel,
    findCourseById: findCourseById
  }
