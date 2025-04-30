const express = require("express");
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postcontroller");

const router = express.Router();

router.get("/", getAllPosts); // Get all posts
router.get("/:id", getPostById); // Get post by ID
router.post("/", createPost); // Create post
router.put("/:id", updatePost); // Update post
router.delete("/:id", deletePost); // Delete post

module.exports = router;
