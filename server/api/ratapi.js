const express = require("express");
const app = express();

app.get("/api/ratapi", (req, res) => res.send("Registering & Ticketing API"));

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;