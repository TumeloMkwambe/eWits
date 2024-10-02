// Import necessary packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Event = require("../models/ticket.models"); 


const app = express();


app.use(express.json());
app.use(cors());

// Mongoose connection
const databaseURI = process.env.MONGO_URI || 'mongodb+srv://Asithandile:rrG9xhqWP8AL9zxs@cluster0.79zpfwz.mongodb.net/WitsEvents?retryWrites=true&w=majority';

// Check if we are not in the test environment, connect to MongoDB only in production or dev
if (process.env.NODE_ENV !== 'test') {
  mongoose
    .connect(databaseURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully!'))
    .catch((err) => console.error('MongoDB connection failed:', err.message));
}

const PORT = process.env.PORT || 3003;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
  });
}


const registrationSchema = new mongoose.Schema({
  event_id: { type: String, required: true },
  user_id: { type: String, required: true },
  ticket_number: { type: String, unique: true, required: true },
  status: { type: String, enum: ["registered", "attended", "cancelled"], default: "registered" },
  createdAt: { type: Date, default: Date.now },
});

const Registration = mongoose.model("Registration", registrationSchema);

// API Endpoints

// Register/Buy ticket for an event
app.post("/registrations/:eventId", async (req, res) => {
    try {
      const { eventId } = req.params;
      const { userId } = req.body;
  
      const event = await Event.findById(eventId);
      if (!event) {
      
        return res.status(404).json({ error: "Event not found" });
      }
  
      const existingRegistration = await Registration.findOne({ event_id: eventId, user_id: userId });
      if (existingRegistration) {
      
        return res.status(400).json({ error: "User already registered for this event" });
      }
  
      const ticketNumber = `TICKET-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      const registration = await Registration.create({
        event_id: eventId,
        user_id: userId,
        ticket_number: ticketNumber,
      });
  
      // Send success response in JSON format
      res.status(201).json({ message: "Registered successfully", registration });
    } catch (error) {
      // Send error response in JSON format
      res.status(500).json({ error: error.message });
    }
  });
  


app.get("/registrations/:eventId", async (req, res) => {
    try {
      const { eventId } = req.params;
      const registrations = await Registration.find({ event_id: eventId });
  
      if (!registrations.length) {
        
        return res.status(404).json({ message: "No registrations found for this event." });
      }
  
     
      res.status(200).json(registrations);
    } catch (error) {
   
      console.error("Error fetching registrations:", error);
      res.status(500).json({ error: error.message });
    }
  });
  

// Cancel registration
app.delete("/registrations/:userId/:eventId", async (req, res) => {
    try {
      const { userId, eventId } = req.params;
      const registration = await Registration.findOneAndDelete({ event_id: eventId, user_id: userId });
  
      if (!registration) {
        // Send error in JSON format
        return res.status(404).json({ error: "Registration not found" });
      }
  
      // Send success message in JSON format
      res.status(200).json({ message: "Registration cancelled and user removed from the event" });
    } catch (error) {
      // Send error response in JSON format
      res.status(500).json({ error: error.message });
    }
  });
  

// Fetch all events
app.get("/events", async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
      const events = await Event.find(); 
      res.json(events);
    } catch (error) {
      console.error("Error fetching events:", error); // Log the error for debugging
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });
  

// Export the app
module.exports = app;