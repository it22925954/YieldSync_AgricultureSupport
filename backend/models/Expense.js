const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  date: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model('Expense', ExpenseSchema);
