// const express = require("express")
// const mongoose = require("mongoose")
// const multer = require("multer")
// const dotenv = require("dotenv")
// const userRoute = require("./src/Routes/user")
// const blogRoute = require("./src/Routes/Blog")
// const LiveClass = require("./src/Routes/LiveClassRoute")
// const CurrentAffair = require("./src/Routes/CurrentAffair")
// const CourseRoute = require("./src/Routes/Courses");
// const CategoryRoute = require("./src/Routes/Category")
// const BookRoute = require("./src/Routes/Book");
// const WishlistRoute = require("./src/Routes/Wishlist");
// const cartRoute = require("./src/Routes/Cart")
// const BillingRoute = require("./src/Routes/BillingDetail")

// const PaymentRoute = require("./src/Routes/PaymentRoute");

// const cors = require('cors');
// dotenv.config({path:"./.env"})

// const app = express();
// app.use(cors());
// app.use(express.json())

// //api
// app.use("/api/user",userRoute);
// app.use("/api/blog",blogRoute);
// app.use("/api/liveclass",LiveClass);
// app.use("/api/currentAffair",CurrentAffair)
// app.use("/api/course",CourseRoute)
// app.use("/api/category",CategoryRoute)
// app.use("/api/book",BookRoute)
// app.use("/api/wishlist",WishlistRoute)
// app.use("/api/cart",cartRoute);
// app.use("/api/billing",BillingRoute)

// app.use("/api",PaymentRoute)
// app.get("/api/getkey", (req, res) =>
//   res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
// );

// mongoose.connect(process.env.DB).then(()=>{
//   console.log("mongodb is connected.")
// }).catch((error)=>{
//   console.log("mongodb error:",error)
// })


// const port = process.env.PORT

// app.listen(port,function(){
//   console.log(`Server is running on port ${port}.`)
// })


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const userRoute = require("./src/Routes/user");
const blogRoute = require("./src/Routes/Blog");
const LiveClass = require("./src/Routes/LiveClassRoute");
const CurrentAffair = require("./src/Routes/CurrentAffair");
const CourseRoute = require("./src/Routes/Courses");
const CategoryRoute = require("./src/Routes/Category");
const BookRoute = require("./src/Routes/Book");
const WishlistRoute = require("./src/Routes/Wishlist");
const cartRoute = require("./src/Routes/Cart");
const BillingRoute = require("./src/Routes/BillingDetail");
const PaymentRoute = require("./src/Routes/PaymentRoute");
const Razorpay = require("razorpay");
const { isAuthenticated } = require("./src/Middleware/Auth");

const app = express();
// app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoute);

// global middleware
// app.use(isAuthenticated)

app.use("/api/blog", blogRoute);
app.use("/api/liveclass", LiveClass);
app.use("/api/currentAffair", CurrentAffair);
app.use("/api/course", CourseRoute);
app.use("/api/category", CategoryRoute);
app.use("/api/book", BookRoute);
app.use("/api/wishlist", WishlistRoute);
app.use("/api/cart", cartRoute);
app.use("/api/billing", BillingRoute);
app.use("/api", PaymentRoute);

app.get("/api/getkey", (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
});


app.get("/", (req, res) => {
  res
    .status(200)
    .send({ message: "Welcome to ExamAtlas backend portal.",
  updated_at: "03-10-2024 04:40 PM IST" });
    });


mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("mongodb is connected!.");
  })
  .catch((error) => {
    console.log("mongodb error:", error);
  });


  // app.get('/paymentsuccess', (req, res) => {
  //   const reference = req.query.reference;
  //   res.send(`Payment successful..! Reference ID: ${reference}`);
  // });


const port = process.env.PORT;

app.listen(port, function () {
  console.log(`Server is running on port ${port}.`);
});
