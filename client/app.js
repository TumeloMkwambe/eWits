const express = require("express");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Listening");

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get('/', (req, res) => {
  try{
    res.send({message: "client"});
  }
  catch(error){
    res.send({error: error.message})
  }
});

module.exports = app;
