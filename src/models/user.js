const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
// User Schema and Model
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: ''
    },
    profilePictureUrl: {
        type: String,
        default: ''
    },
    coverPhotoUrl: {
        type: String,
        default: ''
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    friendRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    sentRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    deletedAt: {
        type: Date,
        default: null
    },
    deleted: {
        type: Boolean,
        default: false
    },
    reported: {
        type: Boolean,
        default: false
    },
    reportCount: {
        type: Number,
        default: 0
    },
    lastActive: {
        type: Date,
        default: Date.now
    },
    notifications: [{
        type: String
    }],
    settings: {
        type: Object,
        default: {}
    },
    tags: [{
        type: String
    }],
    lastLocationCoordinates: {
        type: Object,
        default: {}
    },
    lastLocationName: {
        type: String,
        default: ''
    }


});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.passwordHash = await bcrypt.hash(this.password, 10);
    }
    next();
});
const User = mongoose.model('User', userSchema);

module.exports = User;