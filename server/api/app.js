const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "https://ewits.vercel.app", // Replace with your frontend's deployed URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Required if cookies are used in authentication
}));

app.options("*", cors()); // Handle preflight requests

app.use(express.json());

app.get("/", (req, res) => res.send("Include API specification for all APIs!"));
app.get("/api", (req, res) => res.send("API Gateway"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server ready on port ${PORT}.`));

module.exports = app;
