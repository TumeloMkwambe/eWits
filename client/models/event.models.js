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
    date: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
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
    creator: {
      type: creatorSchema,
      required: true,
    },
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
