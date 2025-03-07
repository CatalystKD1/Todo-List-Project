const express = require('express'); // Express.js frameworl
const cors = require('cors'); // Allows the frontend to communicate with the backend
const bodyParser = require('body-parser');
const routes = require('./routes');

// creating an express application
const app = express();
// what port number the server will be running on
const PORT = 5000;

// innitiate CORS so the frontend communicates with the backend
app.use(cors({ origin: '*'}));
// read in JSON request
app.use(bodyParser.json());
// Handles any apis (idk what this really means yet)
app.use('/api', routes);

app.listen(PORT, () => console.log(`Server runnin on port ${PORT}`));