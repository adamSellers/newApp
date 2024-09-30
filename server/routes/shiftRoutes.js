// server/routes/shiftRoutes.js

const express = require("express");
const router = express.Router();
const {
    createShift,
    getShiftsByRoster,
    updateShift,
    deleteShift,
} = require("../controllers/shiftController");
const auth = require("../middlewares/auth");

// Create a new shift
router.post("/", auth, createShift);

// Get all shifts for a specific roster
router.get("/roster/:rosterId", auth, getShiftsByRoster);

// Update a shift
router.put("/:id", auth, updateShift);

// Delete a shift
router.delete("/:id", auth, deleteShift);

module.exports = router;
