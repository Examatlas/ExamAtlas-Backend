const mongoose = require("mongoose");
const CourseSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true
        },
        price:{
            type:Number,
            required:true,
            trim:true
        },
        image:{
            type:String,
            default:null
        },
        security:{
            type:String,
            // default: 'encryption',
            trim: true
        }
    },{timestamps:true}
)
const Course = mongoose.model('Course',CourseSchema)
module.exports = Course;


