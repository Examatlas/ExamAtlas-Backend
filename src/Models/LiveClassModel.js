const mongoose = require("mongoose");

const LiveClassSchema = mongoose.Schema({
  title: {
    type: String,
  },
  meetingId: {
    type: String,
  },
  token:{
    type:String,
  },
  description: {
    type: String,
  },
  teacher: {
    type: String,
  },
  keyword: {
    type: String,
  },
  tags: [String],
  
  sub_category:{
    type:String,
  },
  category:{
    type:String,
  },
  date_time:{
    type:String,
  }
});

const LiveClassModel = mongoose.model(
  "liveclass",
  LiveClassSchema,
  "Live Classes"
);

module.exports = LiveClassModel;
