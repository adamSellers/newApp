// server/routes/locationRoutes.js
const express = require("express");
const router = express.Router();
const {
    createLocation,
    getLocations,
    updateLocation,
    deleteLocation,
} = require("../controllers/locationController");
const auth = require("../middlewares/auth");

// Create a new location
router.post("/", auth, createLocation);

// Get all locations for the user's business
router.get("/", auth, getLocations);

// Update a location
router.put("/:id", auth, updateLocation);

// Delete a location
router.delete("/:id", auth, deleteLocation);

module.exports = router;
