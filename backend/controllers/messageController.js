const Message = require("../models/Message");

//  Get All Messages
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages", error });
  }
};

//  Send New Message
exports.sendMessage = async (req, res) => {
  try {
    const { username, message } = req.body;
    const newMessage = new Message({ username, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Error sending message", error });
  }
};

//  Save postId inside each message!

//  Get all messages for a specific Post
exports.getMessagesByPostId = async (req, res) => {
  try {
    const { postId } = req.params;
    const messages = await Message.find({ postId }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages", error });
  }
};

//  Send a new message to a specific Post
exports.sendMessageToPost = async (req, res) => {
  try {
    const { username, message } = req.body;
    const { postId } = req.params;

    const newMessage = new Message({ username, message, postId });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Error sending message", error });
  }
};