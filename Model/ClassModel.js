//Require Mongoose
var mongoose = require('mongoose');
var CourseModule = require('../Model/Course');
var Course = CourseModule.CourseModel;
var Chapter = CourseModule.ChapterModel;
//var asyncHandler = require("async");



//Define a schema
var Schema = mongoose.Schema;

var ClassModelSchema = new Schema({
    standard: String,
    sections: [String],
    course: [{type: Schema.Types.ObjectId, ref: 'Course'}]
});

let ClassModel = mongoose.model('ClassModel', ClassModelSchema);


let createNewClass = function(classModel, callBack) {
  let newClass = new ClassModel(classModel);
  console.log("_idofclass" + newClass._id);
  let courseArray = [];
  console.log();
  for(let i=0; i<classModel.course.length; i++) {
    let newCourse = new Course(classModel.course[i]);
    let chapters = []
    for(let j=0; j<classModel.course[i].chapters.length; j++) {
      let newChapter = new Chapter(classModel.course[i].chapters[j]);
      const cratedNewChapter = newChapter.save();
      console.log("_idofchapters" + newChapter._id);
      chapters.push(newChapter._id);
    }
    newCourse.chapters = chapters;
    const cratedNewCourse = newCourse.save();
    console.log("_idofcourse" + newCourse._id);
    courseArray.push(newCourse._id);
  }
  newClass.course = courseArray;
  newClass.save(function (err) {
    if (err) {
      callBack(false, err, null);
    }
    console.log("_idofclass" + newClass._id);
    console.log("saaved!!! class");
    callBack(true, null, 200);
  });
}

 async function getAllClasses() {
 let newPromise = new Promise(function(resolve, error) {
    ClassModel.find(async function (err, data) {
      if (err){
        error(err);
        return;
      }
      if (data) {
        console.log("MainData is" + data);
          for(let j=0; j<data.length; j++) {
            let courseIds = (data[j])["course"];
            let courses = [];

            for(let i=0; i<courseIds.length; i++) {
              // try {
              //   const course = await CourseModule.findCourseById(courseIds[i])
              //   courses.push(course);
              // } catch (error) {
              //   console.log(error);
              // }
              await CourseModule.findCourseById(courseIds[i])
              .then(function(data) {
                console.log("The courses previous" + courses);
                    courses.push(data);
                  },
                  function(error) {
                        console.log(error);
                      });
            }
            (data[j])["course"] = courses;
          }
          resolve(data);
      }
    });
});

console.log("MainData is" + "promise return");
  return newPromise;
}



// Compile model from schema
module.exports = {
    ClassModel: ClassModel,
    createNewClass: createNewClass,
    getAllClasses: getAllClasses
  }
