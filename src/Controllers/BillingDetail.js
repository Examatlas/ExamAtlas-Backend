// controllers/billingController.js
const BillingDetail = require('../Models/BillingDetail');

// Create Billing Detail
exports.createBillingDetail = async (req, res) => {
  try {
    const { 
      firstName, lastName, country, streetAddress, apartment, 
      city, state, pinCode, phone, email 
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !country || !streetAddress || !city || !state || !pinCode || !phone || !email) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Create and save billing detail
    const billingDetail = new BillingDetail({
      firstName,
      lastName,
      country,
      streetAddress,
      apartment,
      city,
      state,
      pinCode,
      phone,
      email
    });

    const savedBillingDetail = await billingDetail.save();
    return res.status(201).json({status:true,message:"user detail saved successfully" , savedBillingDetail});
  } catch (error) {
    res.status(500).json({ status:false, message: 'Server error' });
  }
};


