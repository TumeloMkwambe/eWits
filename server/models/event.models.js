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

const priceSchema = mongoose.Schema({
  general: {
    type: Number,
    default: 0
  },
  vip: {
    type: Number,
    default: 0
  }
});

const ticketSchema = mongoose.Schema({
  type: {
    type: String,
    default: "free"
  },
  price: {
    type: priceSchema
  }
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
    event_type: {
      type: String,
      enum: [
        'Sports',
        'Religion',
        'Education',
        'Music',
        'Arts and Culture',
        'Business and Networking',
        'Food and Drink',
        'Community and Social',
        'Health and Wellness',
        'Charity and Fundraising',
        'Technology',
        'Family',
      ]},
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
      default: 0
    },
    creator: {
      type: creatorSchema,
      required: true,
    },
    interested_users: {
      type: [String]
    },
    ticket: {
      type: ticketSchema
    },
    registrationCount: { // New field to track the number of registrations
      type: Number,
      default: 0,
    }
  },
  {
    timestamps: true,
  },
  {
    collection: "Events",
  }
);

const Events = mongoose.model("Events", eventSchema);

module.exports = Events;