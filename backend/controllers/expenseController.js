const Expense = require('../models/Expense');
const mongoose = require('mongoose');

// Get all expenses
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Create a new expense
const createExpense = async (req, res) => {
  const { date, category, amount, description } = req.body;

  try {
    let newExpense = new Expense({ date, category, amount, description });
    await newExpense.save();
    res.json({ message: "Save successfully", expense: newExpense });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Update an expense
const updateExpense = async (req, res) => {
  const { date, category, amount, description } = req.body;

  try {
    let expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ msg: 'Expense not found' });

    expense.date = date;
    expense.category = category;
    expense.amount = amount;
    expense.description = description;

    await expense.save();
    res.json({ message: "Updated successfully", expense });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Delete an expense
const deleteExpense = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: 'Invalid expense ID' });
  }

  try {
    const expense = await Expense.findById(id);
    if (!expense) return res.status(404).json({ msg: 'Expense not found' });

    await Expense.deleteOne({ _id: id });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error('Error deleting expense:', error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = { getExpenses, createExpense, updateExpense, deleteExpense };
