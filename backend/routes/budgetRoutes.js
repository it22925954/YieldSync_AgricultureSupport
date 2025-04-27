const express = require('express');
const Budget = require('../models/Budget');  // Ensure the correct path to your Budget model
const router = express.Router();

// Route to fetch all budgets
router.get('/', async (req, res) => {
  try {
    const budgets = await Budget.find();  // Fetch all budgets from the database
    res.json(budgets);  // Send the budgets back as a JSON response
  } catch (error) {
    console.error('Error fetching budgets:', error);
    res.status(500).json({ message: 'Failed to fetch budgets.' });  // Internal server error
  }
});

// Route to handle adding a new budget
router.post('/', async (req, res) => {
  const { budgetName, amount, category, date } = req.body;

  try {
    // Validate the incoming data
    if (!budgetName || !amount || !category || !date) {
      return res.status(400).json({ message: "All fields are required!" });  // Bad request if fields are missing
    }

    // Log the incoming data for debugging purposes
    console.log("Received budget data:", req.body);

    // Create a new Budget document
    const newBudget = new Budget({
      budgetName,
      amount,
      category,
      date,
    });

    // Save the new budget to the database
    const savedBudget = await newBudget.save();
    res.status(201).json(savedBudget);  // Send the saved budget as the response
  } catch (error) {
    console.error("Error while saving budget:", error);
    res.status(500).json({ message: "Error saving budget", error: error.message });  // Internal server error
  }
});

// Route to handle updating an existing budget
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { budgetName, amount, category, date } = req.body;

  try {
    // Update the existing budget based on the provided ID
    const updatedBudget = await Budget.findByIdAndUpdate(
      id,
      { budgetName, amount, category, date },
      { new: true }  // Return the updated budget document
    );

    // If the budget is not found, return 404
    if (!updatedBudget) {
      return res.status(404).json({ message: "Budget not found!" });
    }

    // Send the updated budget as the response
    res.json(updatedBudget);
  } catch (error) {
    console.error("Error while updating budget:", error);
    res.status(500).json({ message: "Error updating budget", error: error.message });  // Internal server error
  }
});

// Route to handle deleting a budget
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Delete the budget based on the provided ID
    const deletedBudget = await Budget.findByIdAndDelete(id);

    // If the budget is not found, return 404
    if (!deletedBudget) {
      return res.status(404).json({ message: "Budget not found!" });
    }

    // Send a success message upon successful deletion
    res.json({ message: "Budget deleted successfully" });
  } catch (error) {
    console.error("Error while deleting budget:", error);
    res.status(500).json({ message: "Error deleting budget", error: error.message });  // Internal server error
  }
});

module.exports = router;  // Export the router to be used in the server.js file
