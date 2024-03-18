const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors middleware
const dataRoutes = require('./routes/dataRoutes');
require("dotenv").config()
require("./database");

const app = express();
const PORT = 3001;

// Middleware to allow cross-origin requests
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/BrunelFitnessMongoDB')
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Database connection error:', err));

// Mount the route handler
app.use('/api/data', dataRoutes);
const userRoutes = require("../backend/routes/user.routes")

app.use("/user", userRoutes)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
