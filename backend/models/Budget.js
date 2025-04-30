const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  budgetName: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: String, required: true },
});

module.exports = mongoose.model('Budget', budgetSchema);
