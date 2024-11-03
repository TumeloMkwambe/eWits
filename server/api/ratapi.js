const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors()); // enforce cors later
app.use(express.json());

const Events = require("../models/event.models");
const Registration = require("../models/registration.models"); // Import Registration model
const mongoose = require("mongoose");
const apiKeyAuth = require('../Authorization/auth');
require('dotenv').config();

// GLOBAL VARIABLES
const PORT = process.env.ENV || 3000;
const database = process.env.MONGO_DATABASE_CONNECT;
const schemaFields = ["name", "description", "date", "duration", "location", "poster", "capacity", "creator"];

// MIDDLEWARE

app.use(apiKeyAuth);

// REQUESTS

// New route to fetch registered events for a user
app.get('/api/register/:userID/tickets', async (req, res) => {
  try {
    const userID = req.params.userID;
    
    // Fetch all registrations for this user
    const registrations = await Registration.find({ userID: userID });
    
    if (!registrations || registrations.length === 0) {
      return res.status(404).json({ message: "No tickets found for this user." });
    }

    res.status(200).json(registrations);
  } catch (error) {
    console.error("Error fetching tickets for user:", error.message);
    res.status(500).json({ error: error.message });
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