const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const logger = require("morgan");

dotenv.config({ path: "./.env" });

const allRouter = require("./src/Routes/index")
const Razorpay = require("razorpay");

const app = express();
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/", allRouter);


app.get("/", (req, res) => {
  res
    .status(200)
    .send({ message: "Welcome to ExamAtlas backend portal.",
  updated_at: "14-10-2024 06:45 PM IST" });
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
