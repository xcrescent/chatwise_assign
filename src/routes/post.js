const express = require('express');
const Post = require("../models/post");
const router = express.Router();
// Fetch User's Feed
router.get('/feed', async (req, res) => {
    const userId = req.user._id; // Assuming you have authentication middleware

    const feedPosts = await Post.aggregate([
        {
            $match: {
                $or: [
                    {
                        user: userId
                    },
                    {
                        user: {
                            $in: req.user.friends
                        }
                    },
                    {
                        user: {
                            $in: req.user.following
                        }
                    },
                ],
            },
        }
    ]);
    res.json(feedPosts);
});

// Create a Post
router.post('/post', async (req, res) => {
    const { content } = req.body;
    const post = new Post({
        user: req.user._id,
        content,
    });
    await post.save();
    res.status(201).json(post);
});

// Like a Post
router.put('/post/:id/like', async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }
    if (post.likes.includes(req.user._id)) {
        return res.status(400).json({ error: 'Post already liked' });
    }
    post.likes.push(req.user._id);
    post.likesCount = post.likesCount + 1;
    await post.save();
    res.status(200).json(post);
});

// Add a Comment
router.put('/post/:id/comment', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const post = await Post.findById(id);
    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }
    const comment = {
        user: req.user._id,
        content,
    };
    post.comments.push(comment);
    post.commentsCount = post.commentsCount + 1;
    await post.save();
    res.status(200).json(post);
});

router.delete('/post/:id', async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    if(!post) {
        return res.status(404).json({ error: 'Post not found' });
    }
    if(post.user.toString() !== req.user._id) {
        return res.status(403).json({ error: 'Forbidden' });
    }
    await post.remove();
    res.status(204).send();
});

router.delete('/post/:id/comment/:commentId', async (req, res) => {
    const { id, commentId } = req.params;
    const post = await Post.findById(id);
    if(!post) {
        return res.status(404).json({ error: 'Post not found' });
    }
    const comment = post.comments.id(commentId);
    if(!comment) {
        return res.status(404).json({ error: 'Comment not found' });
    }
    if(comment.user.toString() !== req.user._id) {
        return res.status(403).json({ error: 'Forbidden' });
    }
    comment.remove();
    post.commentsCount = post.commentsCount - 1;
    await post.save();
    res.status(204).send();
});

router.delete('/post/:id/like', async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    if(!post) {
        return res.status(404).json({ error: 'Post not found' });
    }
    const index = post.likes.indexOf(req.user._id);
    if(index === -1) {
        return res.status(400).json({ error: 'Post not liked' });
    }
    post.likes.splice(index, 1);
    post.likesCount = post.likesCount - 1;
    await post.save();
    res.status(204).send();
});

module.exports = router;