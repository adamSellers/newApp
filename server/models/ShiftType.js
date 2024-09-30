// server/models/ShiftType.js
const mongoose = require("mongoose");

const ShiftTypeSchema = new mongoose.Schema({
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
    // Add any additional fields as needed
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("ShiftType", ShiftTypeSchema);
