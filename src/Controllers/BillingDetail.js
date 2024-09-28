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




// Update Billing Detail
exports.updateBillingDetail = async (req, res) => {
  try {
    const billingDetailId = req.params.id;
    const updates = req.body;

    // Find the billing detail by ID and update
    const updatedBillingDetail = await BillingDetail.findByIdAndUpdate(billingDetailId, updates, { new: true });

    if (!updatedBillingDetail) {
      return res.status(404).json({ status: false, message: 'Billing detail not found' });
    }

    return res.status(200).json({ status: true, message: 'Billing detail updated successfully', updatedBillingDetail });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Server error' });
  }
};


// Get Billing Detail by ID
exports.getBillingDetailById = async (req, res) => {
  try {
    const billingDetailId = req.params.id;

    // Find billing detail by ID
    const billingDetail = await BillingDetail.findById(billingDetailId);

    if (!billingDetail) {
      return res.status(404).json({ status: false, message: 'Billing detail not found' });
    }

    return res.status(200).json({ status: true, billingDetail });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Server error' });
  }
};



// Delete Billing Detail
exports.deleteBillingDetail = async (req, res) => {
  try {
    const billingDetailId = req.params.id;

    // Find the billing detail by ID and delete
    const deletedBillingDetail = await BillingDetail.findByIdAndDelete(billingDetailId);

    if (!deletedBillingDetail) {
      return res.status(404).json({ status: false, message: 'Billing detail not found' });
    }

    return res.status(200).json({ status: true, message: 'Billing detail deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Server error' });
  }
};

