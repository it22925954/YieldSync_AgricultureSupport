const mongoose = require('mongoose');

// Create the schema for distributors
const distributorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true },
  type: { type: String, required: true },  // Type of distributor (e.g., Retailer, Wholesaler)
  stock: { type: String, required: true }, 
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

// Create a model from the schema
const Distributor = mongoose.model('Distributor', distributorSchema);

module.exports = Distributor;
