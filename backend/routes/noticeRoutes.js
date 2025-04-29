const express = require("express");
const { getNotices, addNotice, updateNotice, deleteNotice } = require("../controllers/noticeController");

const router = express.Router();

router.get("/", getNotices);       // Get all notices
router.post("/", addNotice);       // Add a new notice
router.put("/:id", updateNotice);  // Update a notice
router.delete("/:id", deleteNotice); // Delete a notice

module.exports = router;
