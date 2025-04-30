require('dotenv').config(); // Load .env variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require("./routes/authRouts");
const budgetRoutes = require('./routes/budgetRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

const authRoutes = require("./routes/authRouts");
const soilWeatherRoutes = require("./routes/soilWeatherRoutes"); // ✅ Only require here

const app = express(); // ✅ Declare app before using it

app.use(express.json());
app.use(cors());

// Debug Mongo URI
console.log("MongoDB URI:", process.env.MONGO_URI);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/soil-weather", soilWeatherRoutes); // ✅ Consistent route prefix

// Test Route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Start server
  // Routes
app.use('/api/budget', budgetRoutes);
app.use('/api/expenses', expenseRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
