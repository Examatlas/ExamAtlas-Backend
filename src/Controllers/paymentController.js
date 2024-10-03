const razorpayInstance = require("../../razorpayInstance"); // Adjust the path as needed
const crypto = require("crypto");
const Payment = require("../Models/paymentModel");

exports.checkout = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100), // amount in smallest unit
      // amount: 5000, // amount in smallest unit
      currency: "INR",
    };
    const order = await razorpayInstance.orders.create(options); // Use the correct instance here
    console.log(order)

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({
      success: false,
      message: "Error creating order",
      error: error.message,
    });
  }
};


exports.paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    try {
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
      res.redirect(
        `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
      );
    } catch (error) {
      console.error("Error saving payment:", error);
      res.status(500).json({
        success: false,
        message: "Payment verification failed",
        error: error.message,
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "Invalid signature",
    });
  }
};
