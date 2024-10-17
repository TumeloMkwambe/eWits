// models/registration.models.js

const mongoose = require("mongoose");

const creatorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
    default: "N/A"  // Add a default value if the surname is missing
  },
  email: {
    type: String,
    required: true,
  },
  _id: {
    type: String,
    required: true,
  }
});

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
    userID: {
      type: String,
      required: true,
    },
    creator: {
      type: creatorSchema,
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
