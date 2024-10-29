const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Payment = require('../models/payment.models'); // Import the Payment model
const paymentRoutes = require('../router/payment.routes');

// Create an Express application
const app = express();
const PORT = process.env.ENV || 3007; 
const database = process.env.MONGO_DATABASE_CONNECT; 

const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    
    if (!apiKey || apiKey !== process.env.REACT_APP_API_KEY) {
      return res.status(401).json({ message: 'Invalid API Key' });
    }
    
    next();
  };
  
  // Apply API Key middleware to payment routes
  app.use('/api', apiKeyMiddleware);
  
  // Routes
  app.use(paymentRoutes);

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB!");

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// POST: Submit a new payment
app.post('/api/payments', async (req, res) => {
  try {
    const { amount, userID, eventID } = req.body;

    if (!amount || !userID || !eventID) {
      return res.status(400).json({ message: 'Invalid data provided' });
    }

    const newPayment = new Payment({
      amount,
      userID,
      eventID,
      status: 'pending' // Initial status
    });

    // Save to the database
    const savedPayment = await newPayment.save();

    res.status(201).json({
      message: 'Payment submitted successfully',
      payment: savedPayment
    });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting payment', error: error.message });
  }
});

// GET: Retrieve all payments
app.get('/api/payments', async (req, res) => {
  try {
    const payments = await Payment.find(); 
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payments', error: error.message });
  }
});
