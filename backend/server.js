require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const distributorRoutes = require("./routes/distributorRoutes");

const app = express();

// Middleware to parse JSON and handle CORS
app.use(express.json());
app.use(cors({
  origin: '*', // Allow all origins (adjust for security as needed)
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit if MongoDB connection fails
  });

// Routes for Distributor CRUD
app.use("/api/distributors", distributorRoutes);

// Test Route
app.get("/api/test", (req, res) => {
  res.json({ message: "✅ API is working!" });
});

// Start the server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
