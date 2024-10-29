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

app.get('/api/events', async (req, res) => {
  try{
    const events = await Events.find();
    res.status(200).json(events);
  }
  catch(error){
    res.status(500).json({error: error.message})
  }
});

app.get('/api/events/:id', async (req, res) => {
  try{
    const events = await Events.findById({_id: req.params.id});
    res.status(200).json(events);
  }
  catch(error){
    res.status(500).json({error: error.message})
  }
});

app.get('/api/events/:field/:value', async (req, res) => {
  try {
    const field = req.params.field;
    const value = req.params.value;
    if(schemaFields.includes(field)){
      const events = await Events.find().where(field).equals(value);
      res.status(200).json(events);
    }
    else{
      res.status(400).send({error: "Bad Request"});
    }
  } catch (error) {
    res.status(500).send({message: error.message})
  }
})

app.post('/api/events/create', async (req, res) => {
  try {
    // Create the event
    const event = await Events.create(req.body);

    // Construct the success message
    const messageContent = `You created an event '${event.name}' successfully on ${new Date().toLocaleDateString()}`;
    console.log("KKK");
    // Add the message to the event's messages array
    //event.messages.push({
      //content: messageContent,
      //date: new Date(),
    //});

    console.log("kkk55");
    // Save the updated event with the success message
    await event.save();

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to delete a specific message from an event
app.delete('/api/events/messages/:msgId', async (req, res) => {
  const msgId = req.params.msgId;

  try {
    // Find the event containing the message
    const event = await Events.findOne({ "messages._id": msgId });

    if (!event) {
      return res.status(404).json({ error: 'Message not found' });
    }

    // Remove the message from the messages array
    event.messages = event.messages.filter(message => message._id.toString() !== msgId);

    // Save the updated event
    await event.save();

    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ error: error.message });
  }
});

// New registration endpoint
app.post('/api/events/:eventID/register', async (req, res) => {
  try {
    const { eventID } = req.params;
    const { fullName, studentNumber, email, phone, creator, userID } = req.body;

    // Check if the user is already registered for the event
    const existingRegistration = await Registration.findOne({ eventID, userID });

    if (existingRegistration) {
      return res.status(200).json({ message: 'registered' });
    }

    const registrationData = {
      eventID,
      fullName,
      studentNumber,
      email,
      phone,
      creator,
      userID,
    };

    // Create a new registration entry
    const registration = await Registration.create(registrationData);

    // Count the total number of registrations for the event
    const registrationCount = await Registration.countDocuments({ eventID });

    // Update the registration count in the Events model
    await Events.findByIdAndUpdate(eventID, { registrationCount }, { new: true });

    res.status(200).json( req.body );
  } catch (error) {
    console.error("Error registering for event:", error.message);
    res.status(500).json({ error: error.message });
  }
});



app.get('/api/events/:id/:field', async (req, res) => {
  try {
    const eventID = req.params.id;
    const field = req.params.field;
    if(schemaFields.includes(field)){
      const event = await Events.find({_id: eventID});
      res.status(200).json({[field]: event[0][field]});
    }
    else{
      res.status(400).send({error: "Bad Request"})
    }
  } catch (error) {
    res.status(500).send({message: error.message})
  }
});

app.put('/api/events/:id', async (req, res) => {
  try {
    const event = await Events.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true});
    res.status(200).send(event);
  } catch (error) {
    res.status(500).send({error: error.message});
  }
});

app.put('/api/events/like/:id', async (req, res) => {
  try {
    const event = await Events.findByIdAndUpdate(
      {_id: req.params.id},
      { $inc: { likes: 1 } }, // Increment likes by 1
      { new: true } // Return the updated document
    );
    res.status(200).send(event);
  } catch (error) {
    res.status(500).send({error: error.message});
  }
})

app.delete('/api/events/:id', async (req, res) => {
  try {
    await Events.findByIdAndDelete({_id: req.params.id});
    res.status(200).send({status: "Event successfully deleted"});
  } catch (error) {
    res.status(500).send({error: error.message})
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
