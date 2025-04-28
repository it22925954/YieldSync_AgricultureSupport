const express = require('express');
const router = express.Router();
const distributorController = require('../controllers/distributorController');

// Define routes
router.post('/add', distributorController.addDistributor);              // Add new distributor
router.get('/all', distributorController.getAllDistributors);          // Get all distributors
router.get('/:id', distributorController.getDistributorById);          // Get distributor by ID
router.put('/update/:id', distributorController.updateDistributor);     // Update distributor by ID
router.delete('/delete/:id', distributorController.deleteDistributor);  // Delete distributor by ID

module.exports = router;
