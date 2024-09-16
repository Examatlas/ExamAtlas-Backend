const express = require("express")
const mongoose = require("mongoose")
const multer = require("multer")
const dotenv = require("dotenv");
const cors=require("cors");
const userRoute = require("./src/Routes/user");
const Blog=require("./src/Routes/Blog");
const LiveClass=require("./src/Routes/LiveClassRoute");

dotenv.config({path:"./.env"});

const app = express();
app.use(express.json());
app.use(multer().any());
app.use(cors());

//api
app.use("/api/user",userRoute);
app.use("/api/blog",Blog);
app.use("/api/liveclass",LiveClass);

mongoose.connect(process.env.DB).then(()=>{
  console.log("mongodb is connected.")
}).catch((error)=>{
  console.log("mongodb error:",error)
})

const port = process.env.PORT

app.listen(port,function(){
  console.log(`Server is running on port ${port}.`)
})

