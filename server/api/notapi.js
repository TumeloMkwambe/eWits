const express = require("express");
const app = express();
const Events = require("../models/event.models.js");
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

app.get('/api', (req, res) => {
  res.send({message: "API?"});
});

app.get('/api/notapi', (req, res) => {
  res.send({message: "Notifications API"});
});

module.exports = app;
