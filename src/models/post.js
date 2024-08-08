const mongoose = require("mongoose");
// Post Schema and Model
const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default: ''
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        content: {
            type: String,
            required: true
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
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
    tags: [{
        type: String
    }],
    location: {
        type: String,
        default: ''
    },
    visibility: {
        type: String,
        default: 'public'
    },
    commentsEnabled: {
        type: Boolean,
        default: true
    },
    likesEnabled: {
        type: Boolean,
        default: true
    },
    sharesEnabled: {
        type: Boolean,
        default: true
    },
    commentsCount: {
        type: Number,
        default: 0
    },
    likesCount: {
        type: Number,
        default: 0
    },
    sharesCount: {
        type: Number,
        default: 0
    },
    shares: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]

});

const Post = mongoose.model('Post', postSchema);


module.exports = Post;