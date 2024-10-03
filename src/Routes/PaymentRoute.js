const express = require("express");
const { checkout, paymentVerification } = require("../Controllers/paymentController"); // Correct require statement

const router = express.Router();

// Define routes with the corresponding handlers
router.route("/checkout").post(checkout);
router.route("/paymentverification").post(paymentVerification);

module.exports = router;
