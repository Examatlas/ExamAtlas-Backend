const mongoose = require("mongoose");

const LiveClassSchema = mongoose.Schema({
  title: {
    type: String,
  },
  meetingId: {
    type: String,
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
});

const LiveClassModel = mongoose.model(
  "liveclass",
  LiveClassSchema,
  "Live Classes"
);

module.exports = LiveClassModel;
