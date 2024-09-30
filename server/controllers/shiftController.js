// server/controllers/shiftController.js

const Shift = require("../models/Shift");
const Roster = require("../models/Roster");
const Business = require("../models/Business");
const ShiftType = require("../models/ShiftType");

// Create a new shift
exports.createShift = async (req, res) => {
    const { rosterId, shiftTypeId, date, startTime, endTime, numberOfStaff } =
        req.body;

    try {
        // Get the business associated with the user
        const business = await Business.findOne({ owner: req.session.userId });
        if (!business) {
            return res.status(400).json({ msg: "Business not found" });
        }

        // Validate roster
        const roster = await Roster.findById(rosterId).populate("location");
        if (!roster || !roster.location.business.equals(business._id)) {
            return res.status(400).json({ msg: "Invalid roster" });
        }

        // Validate shift type
        const shiftType = await ShiftType.findById(shiftTypeId);
        if (!shiftType || !shiftType.business.equals(business._id)) {
            return res.status(400).json({ msg: "Invalid shift type" });
        }

        // Create new shift
        const shift = new Shift({
            roster: roster._id,
            shiftType: shiftType._id,
            date,
            startTime,
            endTime,
            numberOfStaff,
        });

        await shift.save();

        res.status(201).json({ shift });
    } catch (err) {
        console.error("Error creating shift:", err.message);
        res.status(500).send("Server error");
    }
};

// Get all shifts for a specific roster
exports.getShiftsByRoster = async (req, res) => {
    try {
        const rosterId = req.params.rosterId;

        // Validate roster
        const roster = await Roster.findById(rosterId).populate("location");
        if (!roster) {
            return res.status(404).json({ msg: "Roster not found" });
        }

        // Check if the roster belongs to the user's business
        const business = await Business.findOne({ owner: req.session.userId });
        if (!business || !roster.location.business.equals(business._id)) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        const shifts = await Shift.find({ roster: rosterId })
            .populate("shiftType")
            .sort({ date: 1, startTime: 1 });

        res.json({ shifts });
    } catch (err) {
        console.error("Error fetching shifts:", err.message);
        res.status(500).send("Server error");
    }
};

// Update a shift
exports.updateShift = async (req, res) => {
    const { shiftTypeId, date, startTime, endTime, numberOfStaff } = req.body;

    try {
        let shift = await Shift.findById(req.params.id).populate({
            path: "roster",
            populate: { path: "location" },
        });

        if (!shift) {
            return res.status(404).json({ msg: "Shift not found" });
        }

        // Check if the shift's roster belongs to the user's business
        const business = await Business.findOne({ owner: req.session.userId });
        if (!business || !shift.roster.location.business.equals(business._id)) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        // Validate shift type if it's being updated
        if (shiftTypeId && shiftTypeId !== shift.shiftType.toString()) {
            const shiftType = await ShiftType.findById(shiftTypeId);
            if (!shiftType || !shiftType.business.equals(business._id)) {
                return res.status(400).json({ msg: "Invalid shift type" });
            }
            shift.shiftType = shiftType._id;
        }

        // Update fields
        shift.date = date || shift.date;
        shift.startTime = startTime || shift.startTime;
        shift.endTime = endTime || shift.endTime;
        shift.numberOfStaff = numberOfStaff || shift.numberOfStaff;

        await shift.save();

        res.json({ shift });
    } catch (err) {
        console.error("Error updating shift:", err.message);
        res.status(500).send("Server error");
    }
};

// Delete a shift
exports.deleteShift = async (req, res) => {
    try {
        const shift = await Shift.findById(req.params.id).populate({
            path: "roster",
            populate: { path: "location" },
        });

        if (!shift) {
            return res.status(404).json({ msg: "Shift not found" });
        }

        // Check if the shift's roster belongs to the user's business
        const business = await Business.findOne({ owner: req.session.userId });
        if (!business || !shift.roster.location.business.equals(business._id)) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        // Delete shift
        await shift.deleteOne();

        res.json({ msg: "Shift deleted" });
    } catch (err) {
        console.error("Error deleting shift:", err.message);
        res.status(500).send("Server error");
    }
};
