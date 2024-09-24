const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema({
    category:{
        type : String,
        trim : true
    },
    subCategory:{
        type:String,
        trim: true
    },
    description:{
        type:String,
        trim:true
    },
    tags:{
        type : [String],
        
    }},{timestamps:true}
)
const Category = mongoose.model("category",CategorySchema)
module.exports = Category;
