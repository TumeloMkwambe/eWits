const express = require("express");
const cors = require('cors');
const app = express();

// Configure CORS to allow requests only from the specific frontend URL
app.use(cors({
  origin: 'https://demo-app-git-lg-events-and-activities.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.get("/", (req, res) => res.send("Include API specification for all APIs!"));
app.get("/api", (req, res) => res.send("API Gateway"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server ready on port ${PORT}.`));

module.exports = app;
