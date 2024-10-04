// models/registration.models.js

const mongoose = require("mongoose");

const registrationSchema = mongoose.Schema(
  {
    eventID: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    studentNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "register", // Specify the collection name
  }
);

const Registration = mongoose.model("Registration", registrationSchema);

module.exports = Registration;
