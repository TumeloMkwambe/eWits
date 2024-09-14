const express = require('express');
const mongoose = require('mongoose');
const Image = require('../models/image.models');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { bucket } = require('../firebase/firebase.config');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

app.use(cors({
  origin: 'https://demo-app-two-snowy.vercel.app', // Replace with your React app's URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Multer Setup for File Upload
const upload = multer({
  storage: multer.memoryStorage(), // Store in memory temporarily
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Firebase Storage Upload Function
async function uploadImageToFirebase(file) {
  const fileName = `${uuidv4()}-${file.originalname}`;
  const fileUpload = bucket.file(fileName);

  // Upload the file to Firebase Storage
  const stream = fileUpload.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  return new Promise((resolve, reject) => {
    stream.on('error', (error) => reject(error));
    stream.on('finish', async () => {
      // Make the file publicly accessible
      await fileUpload.makePublic();
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
      resolve(publicUrl);
    });
    stream.end(file.buffer);
  });
}

app.get('/api/storage', (req, res) => {
  res.send("Storage API!");
});

// API Route to Upload File
app.post('/api/storage/upload', upload.single('image'), async (req, res) => {
  try {
    // Upload file to Firebase
    const imageUrl = await uploadImageToFirebase(req.file);
    await Images.create({
      imageUrl: imageUrl
    });

    res.status(200).json({ imageUrl });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading file' });
  }
});

const database =
  "mongodb+srv://TumeloMkwambe:T69M5gA2oWaG1w@cluster0.79zpfwz.mongodb.net/WitsEvents?retryWrites=true&w=majority&appName=Cluster0";

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