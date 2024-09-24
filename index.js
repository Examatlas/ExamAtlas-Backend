const express = require("express")
const mongoose = require("mongoose")
const multer = require("multer")
const dotenv = require("dotenv")
const userRoute = require("./src/Routes/user")
const blogRoute = require("./src/Routes/Blog")
const LiveClass = require("./src/Routes/LiveClassRoute")
const CurrentAffair = require("./src/Routes/CurrentAffair")
const CourseRoute = require("./src/Routes/Courses");
const CategoryRoute = require("./src/Routes/Category")

const cors = require('cors');
dotenv.config({path:"./.env"})

const app = express();
app.use(cors());
app.use(express.json())

//api
app.use("/api/user",userRoute);
app.use("/api/blog",blogRoute);
app.use("/api/liveclass",LiveClass);
app.use("/api/currentAffair",CurrentAffair)
app.use("/api/course",CourseRoute)
app.use("/api/category",CategoryRoute)

mongoose.connect(process.env.DB).then(()=>{
  console.log("mongodb is connected.")
}).catch((error)=>{
  console.log("mongodb error:",error)
})

const port = process.env.PORT

app.listen(port,function(){
  console.log(`Server is running on port ${port}.`)
})

