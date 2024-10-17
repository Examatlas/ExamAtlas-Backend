const BookModel = require("../Models/Book")

//create a Book
exports.createBook = async (req, res) => {
  try {

    const { type, title, keyword, content, stock, price,sellPrice, tags, author, bookUrl, categoryId, subCategoryId, subjectId } = req?.body;

    if (!title || !content || !keyword || !price  || !sellPrice || !author ||  !categoryId) {
      return res
        .status(400)
        .json({ message: "Title, content , price , sellPrice , author , categoryId and keyword are required" });
    }
   const check_duplicate = await BookModel.findOne({type: type, title: title, is_active: true});
    if(check_duplicate){
      return res.status(400).json({ status: false, message: "Book already Exists!" });
    }
    let imageFilenames;
    if(req.files.length){
    imageFilenames = req.files.map((file) => {
      return {
        url: `${process.env.BACKEND_URL || 'http://localhost:5000/'}${file.filename}`,
        filename: file.filename,
        contentType: file.mimetype,
        size: file.size,
        uploadDate: Date.now()

      }
    });
  }

    const BookPost = new BookModel({
      type,
      title,
      keyword,
      content,
      stock,
      price,
      sellPrice,
      // shippingCharge,
      tags,
      author,
      bookUrl, 
      addedBy: req?.user?.userId,
      categoryId,
      subCategoryId,
      subjectId,
      images: imageFilenames
    });
    await BookPost.save();
    return res
      .status(200)
      .json({ status: true, message: "Book created succcessfully",
        // BookPost
       });
  } catch (error) {
    console.log(error.message,"error")
    return res
      .status(500)
      .json({ status: false,error, message: "internal server error!" });
  }
};


// // Get all books
exports.getBooks = async (req, res) => {
  try {
    const books = await BookModel.find().sort({ createdAt: -1 });
    if(!books){
      return res.status(404).json({status:"false",message:"Book not found"});
    }
    return res
      .status(200)
      .json({ status: true, message: "Books fetched succcessfully",books });
  } catch (error) {
    console.log(error.message)
    return res
      .status(500)
      .json({ status: false, error, message: "Internal server error",error });
  }
};



// // Get blog by ID
exports.getBookById = async(req, res) => {
  try {
    const id =req?.params?.id;
    const book =await BookModel.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res
      .status(200)
      .json({ status: true,  message: "Book fetched successfully" , book });
  } catch (error) {
    return res
    .status(500)
    .json({ status: false, error, message: "Internal server error" });
  }

};




// // update blog by id
exports.updateBook = async (req, res) => {
  try {
    const {id}=req?.params;
    const { title, keyword, content,price,sellPrice,tags , author , category } = req.body;
    const book = await BookModel.findById(id);
  
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Update fields
    book.title = title || book.title;
    book.keyword = keyword || book.keyword;
    book.price = price || book.price;
    book.sellPrice = sellPrice || book.sellPrice;
    // book.shippingCharge = shippingCharge || book.shippingCharge;
    book.author = author || book.author;
    book.category = category|| book.category;
    book.content = content || book.content;
    book.tags = Array.isArray(tags) ? tags : book.tags;

    await book.save(); // Save the updated blog

    return res
      .status(200)
      .json({ status: true, message: "Book updated successfully",book });
  } catch (error) {
    console.log("error", error.message);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error", error });
  }
};


// // Delete blog by ID
exports.deleteBook = async(req, res) => {
  try {
   const id=req?.params?.id;
   const book =await BookModel.findByIdAndDelete(id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  return res
  .status(200)
  .json({ status: true, message: "Book deleted succcessfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Internal Server error" });
  }
};



