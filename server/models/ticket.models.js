const mongoose = require("mongoose");

// Define Event schema
const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  ticketTypes: [
    {
      type: { type: String, enum: ["general", "vip", "vvip"], required: true },
      price: { type: Number, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

// Create Event model
const Event = mongoose.model("Event", eventSchema);

module.exports = Event;