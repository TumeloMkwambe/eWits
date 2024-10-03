// const express = require("express");
// const app = express();
// const cors = require('cors');
// app.use(cors());
// app.use(express.json());

// const Events = require("../models/event.models");
// const mongoose = require("mongoose");
// const apiKeyAuth = require('../Authorization/auth');
// require('dotenv').config();

// // GLOBAL VARIABLES
// const PORT = process.env.ENV || 3000;
// const database = process.env.MONGO_DATABASE_CONNECT;
// const schemaFields = ["name", "description", "date", "duration", "location", "poster", "capacity", "creator"];

// // MIDDLEWARE

// app.use(apiKeyAuth);

// // REQUESTS

// app.get('/api/events', async (req, res) => {
//   try{
//     const events = await Events.find();
//     res.status(200).json(events);
//   }
//   catch(error){
//     res.status(500).json({error: error.message})
//   }
// });

// app.get('/api/events/:field/:value', async (req, res) => {
//   try {
//     const field = req.params.field;
//     const value = req.params.value;
//     if(schemaFields.includes(field)){
//       const events = await Events.find().where(field).equals(value);
//       res.status(200).json(events);
//     }
//     else{
//       res.status(400).send({error: "Bad Request"});
//     }
//   } catch (error) {
//     res.status(500).send({message: error.message})
//   }
// })

// app.post('/api/events/create', async (req, res) => {
//   try {
//     const event = await Events.create(req.body);
//     res.status(200).json(event);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get('/api/events/:id/:field', async (req, res) => {
//   try {
//     const eventID = req.params.id;
//     const field = req.params.field;
//     if(schemaFields.includes(field)){
//       const event = await Events.find({_id: eventID});
//       res.status(200).json({[field]: event[0][field]});
//     }
//     else{
//       res.status(400).send({error: "Bad Request"})
//     }
//   } catch (error) {
//     res.status(500).send({message: error.message})
//   }
// });

// app.put('/api/events/:id', async (req, res) => {
//   try {
//     const event = await Events.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true});
//     res.status(200).send(event);
//   } catch (error) {
//     res.status(500).send({error: error.message});
//   }
// });

// app.put('/api/events/like/:id', async (req, res) => {
//   try {
//     const event = await Events.findByIdAndUpdate(
//       {_id: req.params.id},
//       { $inc: { likes: 1 } }, // Increment likes by 1
//       { new: true } // Return the updated document
//     );
//     res.status(200).send(event);
//   } catch (error) {
//     res.status(500).send({error: error.message});
//   }
// })

// app.delete('/api/events/:id', async (req, res) => {
//   try {
//     await Events.findByIdAndDelete({_id: req.params.id});
//     res.status(200).send({status: "Event successfully deleted"});
//   } catch (error) {
//     res.status(500).send({error: error.message})
//   }
// });

// mongoose.set("strictQuery", false);
// mongoose
//   .connect(database)
//   .then(() => {
//     console.log("Connected!");
//     app.listen(PORT, () => {
//       console.log("Server Listening on PORT:", PORT);
//     });
//   })
//   .catch(() => {
//     console.log("Connection failed!");
//   });

// Import necessary packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Events = require("../models/event.models");
// const apiKeyAuth = require('../Authorization/auth');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// app.use(apiKeyAuth);

// Mongoose connection
const databaseURI = process.env.MONGO_DATABASE_CONNECT || 'mongodb+srv://Asithandile:rrG9xhqWP8AL9zxs@cluster0.79zpfwz.mongodb.net/WitsEvents?retryWrites=true&w=majority';
console.log(process.env.MONGO_DATABASE_CONNECT)
if (process.env.NODE_ENV !== 'test') {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(databaseURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully!'))
    .catch((err) => console.error('MongoDB connection failed:', err.message));

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
  });
}

const schemaFields = ["name", "description", "date", "duration", "location", "poster", "capacity", "creator"];

// API Endpoints

// Fetch all events
app.get('/events', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const events = await Events.find();
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: error.message });
  }
});

// Fetch events by a specific field and value
app.get('/events/:field/:value', async (req, res) => {
  try {
    const { field, value } = req.params;
    if (schemaFields.includes(field)) {
      const events = await Events.find({ [field]: value });
      if (events.length === 0) {
        return res.status(404).json({ message: "No events found with the specified criteria." });
      }
      res.status(200).json(events);
    } else {
      res.status(400).json({ error: "Invalid field specified." });
    }
  } catch (error) {
    console.error("Error fetching events by field:", error);
    res.status(500).json({ error: error.message });
  }
});

// Create a new event
app.post('/events', async (req, res) => {
  try {
    const event = new Events(req.body);
    await event.save();
    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: error.message });
  }
});

// Fetch a specific field of an event by ID
app.get('/events/:id/:field', async (req, res) => {
  try {
    const { id, field } = req.params;
    if (schemaFields.includes(field)) {
      const event = await Events.findById(id);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.status(200).json({ [field]: event[field] });
    } else {
      res.status(400).json({ error: "Invalid field specified." });
    }
  } catch (error) {
    console.error("Error fetching event field:", error);
    res.status(500).json({ error: error.message });
  }
});


app.get('/events/:id', (req, res) => {
  const eventId = mongoose.Types.ObjectId(req.params.id); // Convert to ObjectId
  Event.findById(eventId, (err, event) => {
    if (err) return res.status(500).send(err);
    if (!event) return res.status(404).send('Event not found');
    res.send(event);
  });
});


// Update an event by ID
app.put('/events/:id', async (req, res) => {
  try {
    const event = await Events.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json({ message: "Event updated successfully", event });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ error: error.message });
  }
});



// Like an event by ID
app.put('/events/like/:id', async (req, res) => {
  try {
    const event = await Events.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json({ message: "Event liked successfully", event });
  } catch (error) {
    console.error("Error liking event:", error);
    res.status(500).json({ error: error.message });
  }
});

// Delete an event by ID
app.delete('/events/:id', async (req, res) => {
  try {
    const event = await Events.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ error: error.message });
  }
});

// Export the app
module.exports = app;
