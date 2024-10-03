const express = require("express");
const app = express();
const cors = require('cors');
const Events = require("../models/event.models.js");
const Notifications = require("../models/notification.model.js");
const { admin } = require('../firebase/firebase.config.js');
const mongoose = require("mongoose");
app.use(express.json());
app.use(cors());

// GLOBAL VARIABLES
const PORT = process.env.PORT || 3003;
const database =
  "mongodb+srv://TumeloMkwambe:T69M5gA2oWaG1w@cluster0.79zpfwz.mongodb.net/WitsEvents?retryWrites=true&w=majority&appName=Cluster0";


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

app.get('/api/notifications/:id', async (req, res) => {
  try{
    const notifications = await Notifications.find().where("user_id").equals(req.params.id);
    res.status(200).json(notifications);
  }
  catch(error){
    res.status(500).json({error: error.message})
  }
});

app.post('/api/notifications/send', async (req, res) => {
  const { user_id, event_id, message, fcm_token } = req.body;
    try {

    const payload = {
      token: fcm_token,
      notification: {
        title: 'New Event Notification',
        body: message,
      }
    };

    const notification = {
      user_id: user_id,
      event_id: event_id,
      notification: message
    }

    const a = await admin.messaging().send(payload);
    await Notifications.create(notification);
    res.status(200).send({notification: a});
  } catch (error) {
    res.status(500).send('Error Sending Notification');
  }
});


module.exports = app;
