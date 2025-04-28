require('dotenv').config(); // Load .env variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const soilWeatherRoutes = require("./routes/soilWeatherRoutes");  // Import soil/weather routes

const app = express();
app.use(express.json()); // Middleware to parse JSON
app.use(cors()); // Middleware for handling cross-origin requests

// Check if MONGO_URI is loaded correctly
console.log("MongoDB URI:", process.env.MONGO_URI); // Debugging

// API Routes
app.use("/api/soil-weather", soilWeatherRoutes); // Use routes for soil and weather data
app.use("/api/auth", require("./routes/authRouts"));  // Authentication routes

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
