require('dotenv').config(); // Load .env variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require("./routes/authRouts");
const postRoutes = require("./routes/postRoutes"); // Import post routes
const noticeRoutes = require("./routes/noticeRoutes");
const messageRoutes = require("./routes/messageRoute");
const distributorRoutes = require('./routes/distributorRoutes');

const app = express(); // ✅ Declare app before using it
app.use(express.json());
app.use(cors({
  origin: '*', // Allow all origins (adjust for security as needed)
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));


app.use(
  cors({
    origin: "*", // Allow requests from any origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
  })
);

// Check if MONGO_URI is loaded correctly
console.log("MongoDB URI:", process.env.MONGO_URI); // Debugging

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/notices", noticeRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/distributors", distributorRoutes);



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
