const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    keyword: {
      type: String,
    },
    content: {
      type: String,
      // required: true,
    },
    tags: [String],
  },
  { timestamps: true }
);

const BlogModel = mongoose.model("Blog", blogSchema);
module.exports = BlogModel;
