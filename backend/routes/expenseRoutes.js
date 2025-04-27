const express = require('express');
const router = express.Router();
const {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} = require('../controllers/expenseController'); // ✅ Make sure this path is correct

router.get('/', getExpenses);
router.post('/create', createExpense); // ❌ This is causing the error if `createExpense` is undefined
router.put('/update/:id', updateExpense);
router.delete('/delete/:id', deleteExpense);

module.exports = router;
