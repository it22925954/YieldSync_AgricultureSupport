const Notice = require("../models/Notice");

// Get all notices
exports.getNotices = async (req, res) => {
  try {
    const notices = await Notice.find();
    res.json(notices);
  } catch (error) {
    res.status(500).json({ error: "Error fetching notices" });
  }
};

// Add a new notice
exports.addNotice = async (req, res) => {
  try {
    const { title, body } = req.body;
    const newNotice = new Notice({ title, body });
    await newNotice.save();
    res.status(201).json(newNotice);
  } catch (error) {
    res.status(500).json({ error: "Error adding notice" });
  }
};

// Update a notice
exports.updateNotice = async (req, res) => {
  try {
    const { title, body } = req.body;
    const updatedNotice = await Notice.findByIdAndUpdate(req.params.id, { title, body }, { new: true });
    if (!updatedNotice) return res.status(404).json({ error: "Notice not found" });
    res.json(updatedNotice);
  } catch (error) {
    res.status(500).json({ error: "Error updating notice" });
  }
};

// Delete a notice
exports.deleteNotice = async (req, res) => {
  try {
    const deletedNotice = await Notice.findByIdAndDelete(req.params.id);
    if (!deletedNotice) return res.status(404).json({ error: "Notice not found" });
    res.json({ message: "Notice deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting notice" });
  }
};
