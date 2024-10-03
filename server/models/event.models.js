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
