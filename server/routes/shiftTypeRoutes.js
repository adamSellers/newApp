// server/routes/shiftTypeRoutes.js
const express = require("express");
const router = express.Router();
const {
    createShiftType,
    getShiftTypes,
    updateShiftType,
    deleteShiftType,
} = require("../controllers/shiftTypeController");
const auth = require("../middlewares/auth");

// Create a new shift type
router.post("/", auth, createShiftType);

// Get all shift types for the user's business
router.get("/", auth, getShiftTypes);

// Update a shift type
router.put("/:id", auth, updateShiftType);

// Delete a shift type
router.delete("/:id", auth, deleteShiftType);

module.exports = router;
