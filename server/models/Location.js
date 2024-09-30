// server/models/Location.js
const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business",
        required: true,
    },
    address: {
        type: String,
        trim: true,
    },
    // Add any additional fields as needed
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Location", LocationSchema);
