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
    date: {
        type: Date,
        required: true,
    },
    startTime: {
        type: String, // e.g., '08:00'
        required: true,
    },
    endTime: {
        type: String, // e.g., '16:00'
        required: true,
    },
    numberOfStaff: {
        type: Number,
        required: true,
        min: 1,
    },
});

module.exports = mongoose.model("Shift", ShiftSchema);
