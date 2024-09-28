// routes/billingRoutes.js
const express = require('express');
const { createBillingDetail, updateBillingDetail, deleteBillingDetail, getBillingDetailById } = require('../Controllers/BillingDetail');
const router = express.Router();

// POST route to create billing detail
router.post('/createBillingDetail', createBillingDetail);

// Update Billing Detail
router.put('/billing/:id',updateBillingDetail );

// Delete Billing Detail
router.delete('/deleteBilling/:id', deleteBillingDetail);

// Get Billing Detail by ID
router.get('/getbilling/:id', getBillingDetailById);

module.exports = router;
