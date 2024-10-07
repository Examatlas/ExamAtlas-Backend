const razorpayInstance = require("../../razorpayInstance"); // Adjust the path as needed
const crypto = require("crypto");
const Order = require("../Models/Order")


exports.checkout = async (req, res) => {
  try {
    
    // console.log("cartItems", req.body.cartItems , "userId" , req.body.userId , "billingId" , req.body.billingDetailId)
    const {cartItems , userId , billingDetailId , amount } = req.body;
    const options = {
      amount: Number(req.body.amount * 100), // amount in smallest unit
      // amount: 5000, // amount in smallest unit
      currency: "INR",
    };
    const order = await razorpayInstance.orders.create(options); // Use the correct instance here
    console.log(order)
    
      const create_order = await Order.create({
        userId : userId,
        billingDetailId : billingDetailId,
        totalAmount : amount,
        razorpay_order_id : order.id,
        items : cartItems
        // razorpay_payment_id,
        // razorpay_signature,
      });
    
    order.orderDetails = create_order
    res.status(200).json({
      success: true,
      order,
    });

  }
   catch (error) {
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

  console.log("Request Body:", req.body);

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    try {
     
      
       const updateOrder = await Order.findOneAndUpdate(
        {
          razorpay_order_id : razorpay_order_id
        },
        {
          status : "Paid",razorpay_payment_id,razorpay_signature
        },
        {
          new : true
        }
       )
       console.log("Payment saved successfully:", updateOrder);
      // Redirecting to success page
      res.redirect(
        `http://localhost:3000/paymentsuccess?reference=${updateOrder._id}&userId=${updateOrder.userId}`
      );

    } catch (error) {
      console.error("Error saving payment:", error);
      const updateOrder = await Order.findOneAndUpdate(
        {
          razorpay_order_id : razorpay_order_id
        },
        {
          status : "Failed"
        },
       )
      res.status(500).json({
        success: false,
        message: "Payment verification failed",
        error: error.message,
      });
    }
  } else {
    const updateOrder = await Order.findOneAndUpdate(
      {
        razorpay_order_id : razorpay_order_id
      },
      {
        status : "Failed"
      },
     )
    console.log("Invalid signature:", { expectedSignature, razorpay_signature });
    res.status(400).json({
      success: false,
      message: "Invalid signature",
    });
  }
};


// get all order api 
exports.getAllOrders = async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await Order.find().sort({ _id: -1 });

    // Filter out orders with items that have a bookId of null
    const filteredOrders = orders.filter(order => 
      order.items && order.items.some(item => item.bookId !== null)
    );

    // Respond with the list of filtered orders
    res.status(200).json({
      success: true,
      orders: filteredOrders.map(order => ({
        _id: order._id,
        userId: order.userId,
        totalAmount: order.totalAmount,
        paymentMethod: "Razorpay", // You can add this manually if it's constant
        status: order.status,
        billingDetailId: order.billingDetailId,
        items: order.items.filter(item => item.bookId !== null), // Filter items with null bookId
        razorpay_order_id: order.razorpay_order_id,
        razorpay_payment_id: order.razorpay_payment_id,
        razorpay_signature: order.razorpay_signature,
      })),
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: error.message,
    });
  }
};



// get order by id
exports.getOrderDetails = async (req, res) => {
  try {
    // Extract the order ID from the request parameters
    const { orderId } = req.params;

    // Find the order by ID
    const order = await Order.findById(orderId);

    // Check if the order exists
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Respond with the order details
    res.status(200).json({
      success: true,
      order: {
        _id: order._id,
        userId: order.userId,
        totalAmount: order.totalAmount,
        paymentMethod: "Razorpay", // You can add this manually
        status: order.status,
        billingDetailId: order.billingDetailId,
        items: order.items,
        razorpay_order_id: order.razorpay_order_id,
        razorpay_payment_id: order.razorpay_payment_id,
        razorpay_signature: order.razorpay_signature,
      },
    });
  } catch (error) {
    console.error("Error fetching order details:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching order details",
      error: error.message,
    });
  }
};



