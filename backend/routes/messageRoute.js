const express = require("express");
const { getAllMessages, sendMessage, getMessagesByPostId, sendMessageToPost } = require("../controllers/messageController");

const router = express.Router();

router.get("/", getAllMessages);
router.post("/", sendMessage);
router.get("/:postId", getMessagesByPostId);
router.post("/:postId", sendMessageToPost);

module.exports = router;