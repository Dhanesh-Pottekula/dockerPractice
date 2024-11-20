// Import required modules
const express = require('express');

// Initialize the Express app
const app = express();

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
