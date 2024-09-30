// server/controllers/shiftTypeController.js
const ShiftType = require("../models/ShiftType");
const Business = require("../models/Business");

// Create a new shift type
exports.createShiftType = async (req, res) => {
    const { name } = req.body;

    try {
        // Get the business associated with the user
        const business = await Business.findOne({ owner: req.session.userId });
        if (!business) {
            return res.status(400).json({ msg: "Business not found" });
        }

        // Create new shift type
        const shiftType = new ShiftType({
            name,
            business: business._id,
        });

        await shiftType.save();

        res.status(201).json({ shiftType });
    } catch (err) {
        console.error("Error creating shift type:", err.message);
        res.status(500).send("Server error");
    }
};

// Get all shift types for the user's business
exports.getShiftTypes = async (req, res) => {
    try {
        // Get the business associated with the user
        const business = await Business.findOne({ owner: req.session.userId });
        if (!business) {
            return res.status(400).json({ msg: "Business not found" });
        }

        const shiftTypes = await ShiftType.find({ business: business._id });

        res.json({ shiftTypes });
    } catch (err) {
        console.error("Error fetching shift types:", err.message);
        res.status(500).send("Server error");
    }
};

// Update a shift type
exports.updateShiftType = async (req, res) => {
    const { name } = req.body;

    try {
        const shiftType = await ShiftType.findById(req.params.id);

        // Check if shift type exists and belongs to the user's business
        if (!shiftType) {
            return res.status(404).json({ msg: "Shift type not found" });
        }

        const business = await Business.findOne({ owner: req.session.userId });
        if (!business || !shiftType.business.equals(business._id)) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        // Update shift type
        shiftType.name = name || shiftType.name;

        await shiftType.save();

        res.json({ shiftType });
    } catch (err) {
        console.error("Error updating shift type:", err.message);
        res.status(500).send("Server error");
    }
};

// Delete a shift type
exports.deleteShiftType = async (req, res) => {
    try {
        const shiftType = await ShiftType.findById(req.params.id);

        // Check if shift type exists and belongs to the user's business
        if (!shiftType) {
            return res.status(404).json({ msg: "Shift type not found" });
        }

        const business = await Business.findOne({ owner: req.session.userId });
        if (!business || !shiftType.business.equals(business._id)) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        // Delete shift type
        await shiftType.remove();

        res.json({ msg: "Shift type deleted" });
    } catch (err) {
        console.error("Error deleting shift type:", err.message);
        res.status(500).send("Server error");
    }
};
