const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Include API specification for all APIs."));

app.get('/api', (req, res) => {
    res.send("API Gateway");
})

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => console.log("Server ready on port 3000."));

module.exports = app;