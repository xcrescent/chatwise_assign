const express = require('express');
const Post = require("../models/post");
const router = express.Router();
// Fetch User's Feed
router.get('/feed', async (req, res) => {
    const userId = req.user._id; // Assuming you have authentication middleware

    const feedPosts = await Post.aggregate([
        // ... (aggregation logic as described earlier)
    ]);
    res.json(feedPosts);
});

// Create a Post
router.post('/post', async (req, res) => {
    // ... (implementation left as exercise)
});

// Like a Post
router.put('/post/:id/like', async (req, res) => {
    // ... (implementation left as exercise)
});

// Add a Comment
router.put('/post/:id/comment', async (req, res) => {
    // ... (implementation left as exercise)
});

module.exports = router;