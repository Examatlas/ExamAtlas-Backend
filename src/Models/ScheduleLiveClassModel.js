const mongoose = require("mongoose");

const ScheduleLiveClassSchema = mongoose.Schema({
  title: {
    type: String,
  },
  meetingId: {
    type: String,
  },
  token:{
    type:String,
  },
  time:{
   type:String,
  },
  date:{
    type:Date,
  },
  courseId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"LiveClassModel"
  }
});

const ScheduleLiveClassModel = mongoose.model(
  "scheduleliveclass",
  ScheduleLiveClassSchema,
  "Scheduled Live Classes"
);

module.exports = ScheduleLiveClassModel;
