const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors()); // enforce cors later
app.use(express.json());

const mongoose = require("mongoose");
require('dotenv').config();

// GLOBAL VARIABLES
const PORT = process.env.ENV || 3000;
const database = process.env.MONGO_DATABASE_CONNECT;

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

app.get('/api/storage/', async (req, res) => {
  try{
    res.status(200).json({message: "Storage API!"});
  }
  catch(error){
    res.status(500).json({error: error.message})
  }
});

const { bucket } = require('../firebase/firebase.config');
