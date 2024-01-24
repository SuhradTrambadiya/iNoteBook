const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');

const app = express();

// Enable CORS for all routes
app.use(cors());

connectToMongo();
app.use(express.json());

const port = 80;

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`iNotebook app listening on port ${port}`);
});
