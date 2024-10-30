
// // models/payment.models.js

// const mongoose = require('mongoose');

// const paymentSchema = new mongoose.Schema({
//   amount: { 
//     type: Number, 
//     required: true 
//   },
//   userID: { 
//     type: String, 
//     required: true 
//   },
//   eventID: { 
//     type: String, 
//     required: true 
//   },
//   status: { 
//     type: String, 
//     enum: ['pending', 'completed', 'failed'], 
//     default: 'pending' 
//   },
//   date: { 
//     type: Date, 
//     default: Date.now 
//   }
// }, {
//   timestamps: true,
//   collection: "Payments"
// });

// const Payment = mongoose.model('Payment', paymentSchema);
// module.exports = Payment;
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  amount: { 
    type: Number, 
    required: true 
  },
  userID: { 
    type: String, 
    required: true 
  },
  eventID: { 
    type: String, 
    required: true 
  },
  email: {
    type: String,
    required: true
  },
  eventName: {
    type: String,
    required: true
  },
  ticketType: {
    type: String,
    required: true
  },
  price: { // Add the ticket price
    type: Number,
    required: true
  },
  status: { 
    type: String, 
    enum: ['pending', 'completed', 'failed'], 
    default: 'pending' 
  },
  date: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true,
  collection: "Payments"
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
