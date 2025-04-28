const Post = require("../models/Post");

//  Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

//  Get a single post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

//  Create a new post (with image support)
exports.createPost = async (req, res) => {
  try {
    const { title, content, image } = req.body;
    const newPost = new Post({ title, content, image });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

//  Update an existing post (including title, content, image)
exports.updatePost = async (req, res) => {
  try {
    const { title, content, image } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, image },
      { new: true }
    );
    if (!updatedPost) return res.status(404).json({ message: "Post not found" });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

//  Delete a uploaded post
exports.deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
