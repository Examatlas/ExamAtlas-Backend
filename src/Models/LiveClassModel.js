const mongoose=require("mongoose");

const LiveClassSchema=mongoose.Schema({
    title:{
        type:String,
    },
    time:{
        type:String,
    },
    description:{
        type:String,
    },
    date:{
        type:String,
    }
});

const LiveClassModel=mongoose.model("liveclass",LiveClassSchema,"Live Classes");

module.exports=LiveClassModel