// routes/billingRoutes.js
const express = require('express');
const { createBillingDetail } = require('../Controllers/BillingDetail');
const router = express.Router();

// POST route to create billing detail
router.post('/createBillingDetail', createBillingDetail);

module.exports = router;
