const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.put('/friendRequest/:id/accept', async (req, res) => {
    const userId = req.user._id;
    const friendId = req.params.id;
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);
    if (!friend) {
        return res.status(404).json({ error: 'Friend not found' });
    }
    if (!user.friendRequests.includes(friendId)) {
        return res.status(400).json({ error: 'No friend request from this user' });
    }
    user.friends.push(friendId);
    friend.friends.push(userId);
    user.friendRequests = user.friendRequests.filter(id => id !== friendId);
    friend.sentRequests = friend.sentRequests.filter(id => id !== userId);
    await user.save();
    await friend.save();
    res.status(200).json({ message: 'Friend request accepted' });
});


router.put('/friendRequest/:id/reject', async (req, res) => {
    const userId = req.user._id;
    const friendId = req.params.id;
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);
    if (!friend) {
        return res.status(404).json({ error: 'Friend not found' });
    }
    if (!user.friendRequests.includes(friendId)) {
        return res.status(400).json({ error: 'No friend request from this user' });
    }
    user.friendRequests = user.friendRequests.filter(id => id !== friendId);
    friend.sentRequests = friend.sentRequests.filter(id => id !== userId);
    await user.save();
    res.status(200).json({ message: 'Friend request rejected' });
});

router.put('/friendRequest/:id/cancel', async (req, res) => {
    const userId = req.user._id;
    const friendId = req.params.id;
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);
    if (!friend) {
        return res.status(404).json({ error: 'Friend not found' });
    }
    if (!user.sentRequests.includes(friendId)) {
        return res.status(400).json({ error: 'No friend request sent to this user' });
    }
    user.sentRequests = user.sentRequests.filter(id => id !== friendId);
    friend.friendRequests = friend.friendRequests.filter(id => id !== userId);
    await user.save();
    await friend.save();
    res.status(200).json({ message: 'Friend request cancelled' });

});


router.put('/friendRequest/:id/send', async (req, res) => {
    const userId = req.user._id;
    const friendId = req.params.id;
    const user = await User.findById(userId);
    const friend = await User.findById
    (friendId);
    if (!friend) {
        return res.status(404).json({ error: 'Friend not found' });
    }
    if (user.sentRequests.includes(friendId)) {
        return res.status(400).json({ error: 'Friend request already sent' });
    }
    if (user.friends.includes(friendId)) {
        return res.status(400).json({ error: 'Already friends' });
    }
    if (user.friendRequests.includes(friendId)) {
        return res.status(400).json({ error: 'Friend request already received' });
    }
    user.sentRequests.push(friendId);
    friend.friendRequests.push(userId);
    await user.save();
    await friend.save();
    res.status(200).json({ message: 'Friend request sent' });

});



module.exports = router;
