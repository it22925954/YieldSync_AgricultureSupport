const Distributor = require('../models/Distributor');


// Add a new distributor
exports.addDistributor = async (req, res) => {
  try {
    // Destructure the request body to include the email field
    const { name, location, contact, stock, email , type } = req.body;

    // Check if all required fields are provided, including email
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Create a new distributor with all fields, including email
    const newDistributor = new Distributor({ name, location, contact, stock, email, type });

    // Save the new distributor to the database
    await newDistributor.save();

    // Respond with success message and distributor details
    res.status(201).json({ message: "Distributor added successfully", distributor: newDistributor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all distributors
exports.getAllDistributors = async (req, res) => {
  try {
    const distributors = await Distributor.find().sort({ createdAt: -1 });
    res.status(200).json(distributors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get distributor by ID
exports.getDistributorById = async (req, res) => {
  try {
    const distributor = await Distributor.findById(req.params.id);
    if (!distributor) {
      return res.status(404).json({ message: "Distributor not found" });
    }
    res.status(200).json(distributor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update distributor
exports.updateDistributor = async (req, res) => {
  try {
    const updatedDistributor = await Distributor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDistributor) {
      return res.status(404).json({ message: "Distributor not found" });
    }
    res.status(200).json({ message: "Distributor updated successfully", distributor: updatedDistributor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete distributor
exports.deleteDistributor = async (req, res) => {
  try {
    const deletedDistributor = await Distributor.findByIdAndDelete(req.params.id);
    if (!deletedDistributor) {
      return res.status(404).json({ message: "Distributor not found" });
    }
    res.status(200).json({ message: "Distributor deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
