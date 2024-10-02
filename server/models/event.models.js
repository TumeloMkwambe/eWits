const mongoose = require("mongoose");

const creatorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const ticketSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ['free', 'paid'], // Allowing only these two types
    required: true,
  },
  price: {
    general: {
      type: Number,
      default: 0, // Default to 0 for free events
    },
    vip: {
      type: Number,
      default: 0, // Default to 0 for free events
    },
  },
});

const eventSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    creator: {
      type: creatorSchema,
      required: true,
    },
    ticket: {
      type: ticketSchema, // Ticket schema now included in the event schema
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "Events", // Ensures that the events are stored in the 'Events' collection
  }
);

const Events = mongoose.model("Events", eventSchema);

module.exports = Events;


