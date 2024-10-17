const express = require('express');
const Review = require('../models/review.models'); // Import the Review model
const app = express();
const cors = require('cors');
app.use(cors()); // enforce cors later
app.use(express.json());
const apiKeyAuth = require('../Authorization/auth');
require('dotenv').config();


const mongoose = require("mongoose");

const PORT = process.env.ENV || 3005;
const database = process.env.MONGO_DATABASE_CONNECT;


app.use(apiKeyAuth);

// POST: Submit a new review
app.post('/api/reviews', async (req, res) => {
  try {
    const { rating, feedback, userID } = req.body;

    
    if (!rating || rating < 1 || rating > 5 || !feedback || !userID) {
      return res.status(400).json({ message: 'Invalid data provided' });
    }


    const newReview = new Review({
      rating,
      feedback,
      userID
    });

    // Save to the database
    const savedReview = await newReview.save();

    res.status(201).json({
      message: 'Review submitted successfully',
      review: savedReview
    });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting review', error: error.message });
  }
});


app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find(); 
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
});


mongoose.set("strictQuery", false);
mongoose
  .connect(database)
  .then(() => {
    console.log("Connected!");
    app.listen(PORT, () => {
      console.log("Server Listening on PORT:", PORT);
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  }); 