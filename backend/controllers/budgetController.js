const Budget = require("../models/Budget");

// ✅ Add a new budget
const addBudget = async (req, res) => {
  try {
    const { description, amount, category, date } = req.body;
    const newBudget = new Budget({ description, amount, category, date });
    await newBudget.save();
    res.status(201).json({ message: "Save Successfully", newBudget });
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

// ✅ Get all budgets
const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

// ✅ Update (edit) a budget entry
const updateBudget = async (req, res) => {
  try {
    const updatedBudget = await Budget.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBudget) {
      return res.status(404).json({ error: "Budget not found" });
    }
    res.status(200).json({ message: "Edit Successfully", updatedBudget });
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

// ✅ Delete a budget entry
const deleteBudget = async (req, res) => {
  try {
    const deletedBudget = await Budget.findByIdAndDelete(req.params.id);
    if (!deletedBudget) {
      return res.status(404).json({ error: "Budget not found" });
    }
    res.status(200).json({ message: "Delete Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

module.exports = { addBudget, getBudgets, updateBudget, deleteBudget };
