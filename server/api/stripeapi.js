
const express = require("express");
const cors = require("cors");
require('dotenv').config();
const app = express();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.use(cors({
  origin: "http://localhost:3001",
  methods: ["GET", "POST"],
  credentials: true,
  headers: ["Content-Type"]
}));

app.use(express.static("public"));
app.use(express.json());

app.post('/api/stripe/create-payment-intent', async (req, res) => {
  try {
    console.log('Received request:', req.body);

    const { items } = req.body;

    if (!items || !items.length) {
      throw new Error('No items provided');
    }
    console.log('Amount received from frontend (in Rands):', items[0].amount);
    const amountInCents = Math.round(items[0].amount * 100);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: items[0].amount, // Stripe expects amount in cents
      currency: 'zar',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log('Payment intent created:', paymentIntent.id);

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: error.message });
  }
});
const calculateOrderAmount = (items) => {
  let total = 0;
  items.forEach((item) => {
    total += item.amount;
  });
  return total;
};

app.listen(5252, () => console.log("Node server listening on port 5252!"));


// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// require('dotenv').config();
// const app = express();
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// // MongoDB connection
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error('MongoDB connection error:', err));

// // Import models
// const Payment = require('../models/payment.models'); // Adjust the path as necessary
// const Review = require('../models/review.models'); // Adjust the path as necessary

// app.use(cors({
//   origin: "http://localhost:3001",
//   methods: ["GET", "POST"],
//   credentials: true,
//   headers: ["Content-Type"]
// }));

// app.use(express.static("public"));
// app.use(express.json());

// // Create payment intent
// app.post('/create-payment-intent', async (req, res) => {
//   try {
//     console.log('Received request:', req.body);

//     const { items } = req.body;

//     if (!items || !items.length) {
//       throw new Error('No items provided');
//     }

//     const amountInCents = Math.round(items[0].amount * 100); // Convert amount to cents
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amountInCents, // Stripe expects amount in cents
//       currency: 'zar',
//       automatic_payment_methods: {
//         enabled: true,
//       },
//     });

//     // Save payment details to the database (optional here, it may be saved in save-payment)
//     // const payment = new Payment({
//     //   eventId: items[0].eventId, // Assuming each item has an eventId
//     //   amount: amountInCents / 100, // Store amount in the base currency (Rands)
//     // });
//     // await payment.save();

//     console.log('Payment intent created:', paymentIntent.id);

//     res.json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     console.error('Error creating payment intent:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Save payment details
// app.post('/api/payments', async (req, res) => {
//   try {
//     const { amount, userID, eventID } = req.body;

//     if (!amount || !userID || !eventID) {
//       return res.status(400).json({ message: 'Invalid data provided' });
//     }

//     const newPayment = new Payment({
//       amount,
//       userID,
//       eventID,
//       status: 'pending' // You can adjust the initial status as needed
//     });

//     // Save to the database
//     const savedPayment = await newPayment.save();

//     res.status(201).json({
//       message: 'Payment submitted successfully',
//       payment: savedPayment
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Error submitting payment', error: error.message });
//   }
// });

// // GET: Retrieve all payments (optional, if you want to view payments)
// app.get('/api/payments', async (req, res) => {
//   try {
//     const payments = await Payment.find(); 
//     res.status(200).json(payments);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching payments', error: error.message });
//   }
// });
// // Function to calculate order amount (not used but kept for reference)
// const calculateOrderAmount = (items) => {
//   let total = 0;
//   items.forEach((item) => {
//     total += item.amount;
//   });
//   return total;
// };

// app.listen(5252, () => console.log("Node server listening on port 5252!"));
