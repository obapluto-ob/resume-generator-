const express = require('express');
const router = express.Router();
const PaymentService = require('../services/paymentService');

// Route to initiate a payment
router.post('/initiate', async (req, res) => {
    try {
        const paymentData = req.body;
        const paymentResponse = await PaymentService.initiatePayment(paymentData);
        res.status(200).json(paymentResponse);
    } catch (error) {
        res.status(500).json({ message: 'Payment initiation failed', error: error.message });
    }
});

// Route to handle payment confirmation
router.post('/confirm', async (req, res) => {
    try {
        const confirmationData = req.body;
        const confirmationResponse = await PaymentService.confirmPayment(confirmationData);
        res.status(200).json(confirmationResponse);
    } catch (error) {
        res.status(500).json({ message: 'Payment confirmation failed', error: error.message });
    }
});

// Route to handle payment cancellation
router.post('/cancel', async (req, res) => {
    try {
        const cancellationData = req.body;
        const cancellationResponse = await PaymentService.cancelPayment(cancellationData);
        res.status(200).json(cancellationResponse);
    } catch (error) {
        res.status(500).json({ message: 'Payment cancellation failed', error: error.message });
    }
});

module.exports = router;