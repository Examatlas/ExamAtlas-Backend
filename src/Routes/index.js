// Initiate all routes here
const Allrouter = require('express').Router();

const authRoute = require("./auth");
const userRoute = require("./user");
const blogRoute = require("./Blog");
const LiveClass = require("./LiveClassRoute");
const CurrentAffair = require("./CurrentAffair");
const CourseRoute = require("./Courses");
const CategoryRoute = require("./Category");
const BookRoute = require("./Book");
const WishlistRoute = require("./Wishlist");
const cartRoute = require("./Cart");
const BillingRoute = require("./BillingDetail");
const PaymentRoute = require("./PaymentRoute");
const SubjectRoute = require("./SubjectRoute");
const {isAuthenticated} = require("../Middleware/Auth");

Allrouter.use("/auth", authRoute);
Allrouter.use(isAuthenticated);
Allrouter.use("/user", userRoute);
Allrouter.use("/blog", blogRoute);
Allrouter.use("/liveclass", LiveClass);
Allrouter.use("/currentAffair", CurrentAffair);
Allrouter.use("/course", CourseRoute);
Allrouter.use("/category", CategoryRoute);
Allrouter.use("/book", BookRoute);
Allrouter.use("/wishlist", WishlistRoute);
Allrouter.use("/cart", cartRoute);
Allrouter.use("/billing", BillingRoute);
Allrouter.use("/payment", PaymentRoute);
Allrouter.use("/subject", SubjectRoute);

module.exports = Allrouter;

