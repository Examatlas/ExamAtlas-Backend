const mongoose = require("mongoose");
const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    keyword: {
      type: String,
      unique: false, 
    },
    price:{
        type:Number
    },
    sellPrice : {
      type:Number
    },
    content: {
      type: String,
      // required: true,
    },
    author:{
        type:String,
        trim:true
    },
    category:{
        type:String,
        trim:true
    },
    // shippingCharge:{
    //   type: String
    // },
    tags: [String],
  },
  { timestamps: true }
);

const BookModel = mongoose.model("Book", BookSchema);
module.exports = BookModel;
