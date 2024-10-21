const BookModel = require("../Models/Book")
const mongoose = require("mongoose");

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
      tags: tags ? JSON.parse(tags): null,
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
    console.log(error.message," error")
    return res
      .status(500)
      .json({ status: false,error, message: "internal server error!" });
  }
};


// Function to get paginated all books with isInCart flag for a specific user
exports.getBooksPaginatedWithCartFlag = async (req, res) => {
  try {
    const {type, categoryId, subCategoryId, subjectId, search, is_active=true,page = 1, per_page = 10, sortOrder='asc'} = req.query;
    const userId = req?.user?.userId;
    const skip = (parseInt(page) - 1) * parseInt(per_page); // Calculate how many items to skip
    // Determine sorting order: 'asc' for ascending, 'desc' for descending
    const sortDirection = sortOrder === 'asc' ? 1 : -1;

    let condition = {};
    condition.is_active = is_active;
    if(type){
      condition.type = type;
  }
    if(categoryId){
        condition.categoryId = categoryId;
    }
    if(subCategoryId){
      condition.subCategoryId = subCategoryId;
  }
  if(subjectId){
    condition.subjectId = subjectId;
}
    if(search){
        condition["$or"] = [ {title: {$regex: `${search}`, $options: 'i'}
               }
             ];
    }
    // Count total active books (for pagination metadata)
    const totalBooks = await BookModel.countDocuments(condition);
    // Aggregate query with pagination
    const booksWithCartAndWishlistFlags = await BookModel.aggregate([
      {
        $match: condition // Fetch only active books
      },
      {
        $lookup: {
          from: 'carts', // Cart collection
          let: { bookId: '$_id' }, // Current book _id
          pipeline: [
            { 
              $match: { 
                $expr: { 
                  $eq: ['$userId', new mongoose.Types.ObjectId(userId)] // Match the userId from Cart
                }
              }
            },
            { $unwind: '$items' }, // Unwind cart items
            { 
              $match: { 
                $expr: { 
                  $eq: ['$items.bookId', '$$bookId'] // Match bookId from Cart items
                } 
              } 
            }
          ],
          as: 'cartItems'
        }
      },
      {
        $lookup: {
          from: 'wishlists', // Wishlist collection
          let: { bookId: '$_id' }, // Current book _id
          pipeline: [
            { 
              $match: { 
                $expr: { 
                  $eq: ['$userId', new mongoose.Types.ObjectId(userId)] // Match the userId from WishList
                }
              }
            },
            { 
              $match: { 
                $expr: { 
                  $eq: ['$bookId', '$$bookId'] // Match bookId from WishList
                } 
              } 
            }
          ],
          as: 'wishItems'
        }
      },
      {
        $addFields: {
          isInCart: { $gt: [{ $size: '$cartItems' }, 0] }, // If cartItems array has elements, set isInCart to true
          isInWishList: { $gt: [{ $size: '$wishItems' }, 0] } // If wishItems array has elements, set isInWishList to true
        }
      },
      {
        $project: {
          cartItems: 0, // Remove cartItems field from the final result
          wishItems: 0  // Remove wishItems field from the final result
        }
      },
      {
        $sort: { createdAt: sortDirection } // Sort by createdAt (ascending or descending)
      },
      { $skip: skip },  // Pagination: Skip the first (page-1) * limit records
      { $limit: parseInt(per_page) }, // Pagination: Limit the results to the given page size (default 10)
    ]);
    

    // Pagination metadata
    const totalPages = Math.ceil(totalBooks / parseInt(per_page));

    return res.status(200).send({
      status: true,
      message: "Books fetched succcessfully",
      books: booksWithCartAndWishlistFlags,
      pagination: {
        totalRows: totalBooks,
        totalPages,
        currentPage: parseInt(page),
        pageSize: parseInt(per_page)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({status:true, nessage: 'Error fetching paginated books', error: error});
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



