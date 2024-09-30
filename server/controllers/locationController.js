// server/controllers/locationController.js
const Location = require("../models/Location");
const Business = require("../models/Business");

// Create a new location
exports.createLocation = async (req, res) => {
    const { name, address } = req.body;

    try {
        // Get the business associated with the user
        const business = await Business.findOne({ owner: req.session.userId });
        if (!business) {
            return res.status(400).json({ msg: "Business not found" });
        }

        // Create new location
        const location = new Location({
            name,
            address,
            business: business._id,
        });

        await location.save();

        res.status(201).json({ location });
    } catch (err) {
        console.error("Error creating location:", err.message);
        res.status(500).send("Server error");
    }
};

// Get all locations for the user's business
exports.getLocations = async (req, res) => {
    try {
        // Get the business associated with the user
        const business = await Business.findOne({ owner: req.session.userId });
        if (!business) {
            return res.status(400).json({ msg: "Business not found" });
        }

        const locations = await Location.find({ business: business._id });

        res.json({ locations });
    } catch (err) {
        console.error("Error fetching locations:", err.message);
        res.status(500).send("Server error");
    }
};

// Update a location
exports.updateLocation = async (req, res) => {
    const { name, address } = req.body;

    try {
        const location = await Location.findById(req.params.id);

        // Check if location exists and belongs to the user's business
        if (!location) {
            return res.status(404).json({ msg: "Location not found" });
        }

        const business = await Business.findOne({ owner: req.session.userId });
        if (!business || !location.business.equals(business._id)) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        // Update location
        location.name = name || location.name;
        location.address = address || location.address;

        await location.save();

        res.json({ location });
    } catch (err) {
        console.error("Error updating location:", err.message);
        res.status(500).send("Server error");
    }
};

// Delete a location
exports.deleteLocation = async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);

        // Check if location exists and belongs to the user's business
        if (!location) {
            return res.status(404).json({ msg: "Location not found" });
        }

        const business = await Business.findOne({ owner: req.session.userId });
        if (!business || !location.business.equals(business._id)) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        // Delete location
        await location.remove();

        res.json({ msg: "Location deleted" });
    } catch (err) {
        console.error("Error deleting location:", err.message);
        res.status(500).send("Server error");
    }
};
