const express = require("express")
const mongoose = require("mongoose")
const multer = require("multer")
const logger = require("morgan");
const dotenv = require("dotenv")
const userRoute = require("./src/Routes/user")
const blogRoute = require("./src/Routes/Blog")
const LiveClass = require("./src/Routes/LiveClassRoute")
const CurrentAffair = require("./src/Routes/CurrentAffair")
const CourseRoute = require("./src/Routes/Courses");
const CategoryRoute = require("./src/Routes/Category")
const BookRoute = require("./src/Routes/Book");
const WishlistRoute = require("./src/Routes/Wishlist");
const cartRoute = require("./src/Routes/Cart")
const BillingRoute = require("./src/Routes/BillingDetail")

const cors = require('cors');
dotenv.config({path:"./.env"})

const app = express();
app.use(logger('dev'));
app.use(cors());
app.use(express.json())

//api
app.use("/api/user",userRoute);
app.use("/api/blog",blogRoute);
app.use("/api/liveclass",LiveClass);
app.use("/api/currentAffair",CurrentAffair)
app.use("/api/course",CourseRoute)
app.use("/api/category",CategoryRoute)
app.use("/api/book",BookRoute)
app.use("/api/wishlist",WishlistRoute)
app.use("/api/cart",cartRoute);
app.use("/api/billing",BillingRoute)

mongoose.connect(process.env.DB).then(()=>{
  console.log("mongodb is connected.")
}).catch((error)=>{
  console.log("mongodb error:",error)
})

const port = process.env.PORT

app.listen(port,function(){
  console.log(`Server is running on port ${port}.`)
})

