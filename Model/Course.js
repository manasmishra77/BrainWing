//Require Mongoose
 mongoose = require('mongoose');
 //var asyncHandler = require("async");


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

let findCourseById = async function(courseId) {
 let newPromise = new Promise(function(resolve, error) {
     CourseModel.findById(courseId, async function (err, data) {
       if (err){
         error(err);
         return;
       }
       if (data) {
         let chapterIds = data["chapters"];
         console.log(chapterIds);
         let chapters = [];
         for(let i=0; i<chapterIds.length; i++) {
           // try {
           //   const chapter = await findChaptersById(chapterIds[i])
           //   chapters.push(chapter);
           // } catch (error) {
           //   console.log(error);
           // }
        await findChaptersById(chapterIds[i])
        .then(function(data) {
          console.log("The chapter previous" + chapters);
              chapters.push(data);
              console.log("The chapter after" + chapters);
            },
            function(error) {
                  console.log(error);
                });
         }
         data["chapters"] = chapters;
         resolve(data);
       }
      });
   });
   return newPromise;
}

let findChaptersById = async function(chapterId) {
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
}

// Compile model from schema
module.exports = {
    CourseModel: CourseModel,
    ChapterModel: ChapterModel,
    findCourseById: findCourseById
    //getCourseById: getCourseById
  }
