const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Route to initiate a payment
router.post('/initiate', paymentController.initiatePayment);

// Route to handle payment success
router.post('/success', paymentController.paymentSuccess);

// Route to handle payment failure
router.post('/failure', paymentController.paymentFailure);

module.exports = router;