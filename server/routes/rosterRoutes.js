// server/routes/rosterRoutes.js
const express = require("express");
const router = express.Router();
const {
    createRoster,
    getRosters,
    getRosterById,
    updateRoster,
    deleteRoster,
} = require("../controllers/rosterController");
const auth = require("../middlewares/auth");

// Create a new roster
router.post("/", auth, createRoster);

// Get all rosters for the user's business
router.get("/", auth, getRosters);

// Get a specific roster by ID
router.get("/:id", auth, getRosterById);

// Update a roster
router.put("/:id", auth, updateRoster);

// Delete a roster
router.delete("/:id", auth, deleteRoster);

module.exports = router;
