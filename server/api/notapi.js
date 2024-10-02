const express = require("express");
const app = express();
const Events = require("../models/event.models.js");
const Notifications = require("../models/notification.model.js");
const { admin } = require('../firebase/firebase.config.js');
const mongoose = require("mongoose");
app.use(express.json());

// GLOBAL VARIABLES
const PORT = process.env.PORT || 3003;
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

app.get('/api/notifications', (req, res) => {
  res.send({message: "Notifications API"});
});

app.post('/api/notifications/send', async (req, res) => {
  const { message } = req.body;
  const fcm_token = "ev5ddgy8Daagq92Uhvk6F4:APA91bG2Z7Ze-CPtXMLLjS8vwKsLk_vWI09dXuvz01iD5uLqc5uP_OjN90kt3ac5VMgJc8Jm_4iCTCLva8nt2IiDjcvx1c_kwQW5PAtxFn5PXEeDEwD7tRcIwpthsI2VIyIpjuzhliHt";
  try {

    const payload = {
      token: fcm_token,
      notification: {
        title: 'New Event Notification',
        body: message,
      }
    };

    const notification = {
      user_id: "6f6db9d49eb3c50eb10cf25",
      notification: message
    }

    await admin.messaging().send(payload);
    await Notifications.create(notification);
    res.status(200).send({notification: message});
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).send('Error sending notification');
  }
});


module.exports = app;
