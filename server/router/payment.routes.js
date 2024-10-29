const express = require('express');
const router = express.Router();
const Payment = require('../models/payment.models');

// POST: Create new payment
router.post('/api/payments', async (req, res) => {
  try {
    const {
      amount,
      userID,
      eventID,
      paymentIntentId,
      email,
      eventName,
      ticketType,
      paymentStatus
    } = req.body;

    // Validate required fields
    if (!amount || !userID || !eventID || !paymentIntentId || !email || !eventName || !ticketType) {
      return res.status(400).json({ 
        message: 'Missing required payment information',
        missingFields: Object.entries({
          amount,
          userID,
          eventID,
          paymentIntentId,
          email,
          eventName,
          ticketType
        }).filter(([_, value]) => !value).map(([key]) => key)
      });
    }

    const newPayment = new Payment({
      amount,
      userID,
      eventID,
      paymentIntentId,
      email,
      eventName,
      ticketType,
      status: paymentStatus === 'succeeded' ? 'completed' : 'pending'
    });

    const savedPayment = await newPayment.save();

    res.status(201).json({
      message: 'Payment saved successfully',
      payment: savedPayment
    });
  } catch (error) {
    console.error('Payment save error:', error);
    res.status(500).json({ 
      message: 'Error saving payment details', 
      error: error.message 
    });
  }
});

// GET: Retrieve all payments
router.get('/api/payments', async (req, res) => {
  try {
    const payments = await Payment.find().sort({ date: -1 });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching payments', 
      error: error.message 
    });
  }
});

// GET: Retrieve payments by user ID
router.get('/api/payments/user/:userId', async (req, res) => {
  try {
    const payments = await Payment.find({ userID: req.params.userId }).sort({ date: -1 });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching user payments', 
      error: error.message 
    });
  }
});

// GET: Retrieve payments by event ID
router.get('/api/payments/event/:eventId', async (req, res) => {
  try {
    const payments = await Payment.find({ eventID: req.params.eventId }).sort({ date: -1 });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching event payments', 
      error: error.message 
    });
  }
});

// GET: Retrieve payment by payment intent ID
router.get('/api/payments/intent/:paymentIntentId', async (req, res) => {
  try {
    const payment = await Payment.findOne({ paymentIntentId: req.params.paymentIntentId });
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching payment', 
      error: error.message 
    });
  }
});

module.exports = router;