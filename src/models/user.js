const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
// User Schema and Model
const userSchema = new mongoose.Schema({
    // ... (same schema as described earlier)
});
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.passwordHash = await bcrypt.hash(this.password, 10);
    }
    next();
});
const User = mongoose.model('User', userSchema);

module.exports = User;