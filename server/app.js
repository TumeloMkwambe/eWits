const express = require("express");
const app = express();
const Events = require("./models/event.models.js");
const mongoose = require("mongoose");
app.use(express.json());

// GLOBAL VARIABLES
const PORT = process.env.PORT || 3000;
const database =
  "mongodb+srv://TumeloMkwambe:T69M5gA2oWaG1w@cluster0.79zpfwz.mongodb.net/WitsEvents?retryWrites=true&w=majority&appName=Cluster0";
const schemaFields = ["name", "description", "date", "duration", "location", "poster", "capacity", "creator"];


// MIDDLEWARE
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

// REQUESTS

app.get('/', (req, res) => {
  res.send({message: "OK"});
});

app.get('/events', async (req, res) => {
  try{
    const events = await Events.find();
    res.status(200).json(events);
  }
  catch(error){
    res.status(500).json({error: error.message})
  }
});

app.get('/events/:field/:value', async (req, res) => {
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

app.post('/event/create', async (req, res) => {
  try {
    const event = await Events.create(req.body);
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/event/:id/:field', async (req, res) => {
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

app.put('/event/:id', async (req, res) => {
  try {
    await Events.findByIdAndUpdate({_id: req.params.id}, req.body);
    const event = await Events.find({_id: req.params.id});
    res.status(200).send(event);
  } catch (error) {
    res.status(500).send({error: error.message});
  }
});

app.delete('/event/:id', async (req, res) => {
  try {
    await Events.findByIdAndDelete({_id: req.params.id});
    res.status(200).send({status: "Event successfully deleted"});
  } catch (error) {
    res.status(500).send({error: error.message})
  }
});

module.exports = app;