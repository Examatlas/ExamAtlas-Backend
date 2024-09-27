const mongoose = require("mongoose");

const LiveClassSchema = mongoose.Schema({
  title: {
    type: String,
  },
 
  description: {
    type: String,
  },
  teacher: {
    type: String,
  },
  
  tags: [String],
  
  sub_category:{
    type:String,
  },
  category:{
    type:String,
  },
  
});

const LiveClassModel = mongoose.model(
  "liveclass",
  LiveClassSchema,
  "Live Classes"
);

module.exports = LiveClassModel;
