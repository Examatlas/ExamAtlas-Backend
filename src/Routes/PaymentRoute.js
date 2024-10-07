// const express = require("express");
// const { checkout, paymentVerification } = require("../Controllers/paymentController"); // Correct require statement

// const router = express.Router();

// // Define routes with the corresponding handlers
// router.route("/checkout").post(checkout);
// router.route("/paymentverification").post(paymentVerification);

// module.exports = router;



const express = require("express");
const { checkout, paymentVerification, getAllOrders, getOrderDetails } = require("../Controllers/paymentController"); // Adjust the path to your controller

const router = express.Router();

// Route for creating the order (checkout)
router.post("/checkout", checkout);
router.get("/orders", getAllOrders);
router.get("/order/:orderId", getOrderDetails);
// Route for payment verification
router.post("/paymentverification", paymentVerification);

module.exports = router;
