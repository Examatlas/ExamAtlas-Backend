const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        trim:true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type:String,
        default:"user"
    }
},
    { timestamps: true })
const User = mongoose.model("User",userSchema);
module.exports = User;

