// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const { MONGO_PORT, MONGO_IP, MONGO_PASSWORD, MONGO_USER } = require('./config/config');

// Initialize the Express app
const app = express();
mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`).then(()=>{
  console.log("successfully connected to data base")
}).catch((err)=>{
  console.log(err)
})
// Middleware to parse JSON request bodies
app.use(express.json());

// Define a port for the server
const PORT = process.env.PORT || 4000;

// Define a sample route
app.get('/', (req, res) => {
  res.send(`Welcome to the Node.js API Serve!!${process.env.PORT}`);
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
