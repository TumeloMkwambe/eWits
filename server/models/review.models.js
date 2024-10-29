const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 5 
  },
  feedback: { 
    type: String, 
    required: true,
    minlength: 1,
    maxlength: 1000
  },
  userID: { 
    type: String, 
    required: true 
  }, 
  date: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true,
  collection: "Reviews"
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;