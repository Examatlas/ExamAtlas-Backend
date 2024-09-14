const BlogModel = require("../Models/Blog");

//create a Blog 
const createBlog = async (req, res) => {
  try {
    const { title, keyword, content, tags } = req?.body;

    const BlogPost = new BlogModel({
      title,
      keyword,
      content,
      tags,
    });
    await BlogPost.save();
    return res
      .status(200)
      .json({ status: true, message: "Blog created succcessfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "internal server error!" });
  }
};

module.exports = {
  createBlog,
};
