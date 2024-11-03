const express = require("express");
const cors = require("cors");

const app = express();

// Configure CORS to allow requests from the frontend
app.use(cors({
  origin: [
    "https://ewits.vercel.app", // Your frontend
    "https://ewitsserver.vercel.app" // Your backend
  ],
  credentials: true, // Allows cookies to be included in requests
}));

app.use(express.json());

app.get("/", (req, res) => res.send("Include API specification for all APIs!"));
app.get("/api", (req, res) => res.send("API Gateway"));

// Set port based on environment variable or default to 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server ready on port ${PORT}.`));

module.exports = app;
