const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const logger = require("morgan");
const path = require("path");
dotenv.config({ path: "./.env" });

const allRouter = require("./src/Routes/index")
const Razorpay = require("razorpay");

const app = express();
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log("path: ", path.join(__dirname, 'src/uploads'))
app.use(express.static(path.join(__dirname, 'src/uploads')));

app.use("/api/", allRouter);
app.get("/", (req, res) => {
  res
    .status(200)
    .send({ message: "Welcome to ExamAtlas backend portal.",
  updated_at: "21-10-2024 11:57 PM IST" });
    });


mongoose
  .connect(process.env.DB)
  .then((res) => {
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