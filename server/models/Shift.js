// server/models/Shift.js
const mongoose = require("mongoose");

const ShiftSchema = new mongoose.Schema({
    roster: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Roster",
        required: true,
    },
    shiftType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ShiftType",
        required: true,
    },
    startTime: {
        type: String, // Using string to represent time (e.g., '06:00')
        required: true,
    },
    endTime: {
        type: String, // Using string to represent time (e.g., '10:00')
        required: true,
    },
    numberOfStaff: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Shift", ShiftSchema);
