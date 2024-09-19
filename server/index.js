const express = require('express');
const app = express();
const routes = require('./api/routes');


app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
