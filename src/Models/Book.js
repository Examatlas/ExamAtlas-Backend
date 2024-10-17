const mongoose = require("mongoose");
const BookSchema = new mongoose.Schema(
  {
    type: {
      type: String, // book or ebook
      trim: true
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    keyword: {
      type: String,
      unique: false, 
      default: null
    },
    stock: {
      type: Number,
      required: true,
      default: 0
    },
    price:{
        type:Number,
    },
    sellPrice : {
      type:Number
    },
    content: {
      type: String,
      default: null
      // required: true,
    },
    author:{
        type:String,
        trim:true,
        default: null
    },
    categoryId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      trim:true,
      required: true,
      default: null
    },
    subCategoryId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubCategory',
      trim:true,
      required: false,
      default: null
    },
    subjectId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
      trim:true,
      required: false,
      default: null
    },
    // shippingCharge:{
    //   type: String
    // },
    tags: [String],
    bookUrl: {type: String, trim: true, default: null},
    images: [
      {
        url: { type: String, required: true, trim: true },  // URL or path to the image
        filename: { type: String, required: true, trim: true },  // Image filename
        contentType: { type: String,trim: true },  // Optional: Content type (e.g., 'image/jpeg')
        size: { type: Number },  // Optional: File size in bytes
        uploadDate: { type: Date, default: Date.now }  // Optional: Upload timestamp
      }
    ],
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
      default: null
    },
    deletedAt: {
      type: Date,
      required: false,
      default: null
    },
    is_active: {
      type: Boolean,
      required: true,
      default: true
    },
  },
  { timestamps: true }
);

const BookModel = mongoose.model("Book", BookSchema);
module.exports = BookModel;
