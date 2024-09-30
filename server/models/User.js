// server/models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, // Removes whitespace
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Minimum password length
    },
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("User", UserSchema);
