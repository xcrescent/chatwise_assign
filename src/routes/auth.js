const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require("../models/user");
// Login Route (generates JWT)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({
            message: 'Invalid email or password' });
    }

    const
        passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
        return res.status(401).json({ message:
                'Invalid email or password' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
});


// Register Route
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ email, password });
    await user.save();
    res.status(201).json({ message: 'User created' });
}
);

// Get all users
router.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// Get user by id
router.get('/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({message: 'User not found'});
    }

    res.json(user);
}
);

// Update user by id
router.put('/users/:id', async (req, res) => {
    // Update only if the user is the same as the one in the token

    if (req.user._id !== req.params.id) {
        return res.status(403).json({ message: 'Forbidden' });
    }


    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.json(user);
}
);

// Delete user by id

router.delete('/users/:id', async (req, res) => {
    // Delete only if the user is the same as the one in the token
    if (req.user._id !== req.params.id) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send();

});




module.exports = router;