require('dotenv').config(); // Load .env variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require("./routes/authRouts");
const budgetRoutes = require('./routes/budgetRoutes');


const app = express();
app.use(express.json());
app.use(cors());

// Check if MONGO_URI is loaded correctly
console.log("MongoDB URI:", process.env.MONGO_URI); // Debugging

app.use("/api/auth", authRoutes);

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

  // Routes
app.use('/api/budget', budgetRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
