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
    const event = await Events.create(req.body);
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// New registration endpoint
app.post('/api/events/:eventID/register', async (req, res) => {
  try {
    const registrationData = {
      eventID: req.params.eventID,
      ...req.body
    };

    const registration = await Registration.create(registrationData);
    res.status(200).json(registration);
  } catch (error) {
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
