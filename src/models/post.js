const mongoose = require("mongoose");
// Post Schema and Model
const postSchema = new mongoose.Schema({
    // ... (same schema as described earlier)
});

const Post = mongoose.model('Post', postSchema);


module.exports = Post;