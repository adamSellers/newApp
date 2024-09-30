// server/controllers/rosterController.js

const Roster = require("../models/Roster");
const Business = require("../models/Business");
const Location = require("../models/Location");
const Shift = require("../models/Shift"); // Import the Shift model

// Create a new roster
exports.createRoster = async (req, res) => {
    const { name, locationId, startDate, endDate } = req.body;

    try {
        // Get the business associated with the user
        const business = await Business.findOne({ owner: req.session.userId });
        if (!business) {
            return res.status(400).json({ msg: "Business not found" });
        }

        // Validate location
        const location = await Location.findById(locationId);
        if (!location || !location.business.equals(business._id)) {
            return res.status(400).json({ msg: "Invalid location" });
        }

        // Create new roster
        const roster = new Roster({
            name,
            location: location._id,
            startDate,
            endDate,
        });

        await roster.save();

        res.status(201).json({ roster });
    } catch (err) {
        console.error("Error creating roster:", err.message);
        res.status(500).send("Server error");
    }
};

// Get all rosters for the user's business
exports.getRosters = async (req, res) => {
    try {
        // Get the business associated with the user
        const business = await Business.findOne({ owner: req.session.userId });
        if (!business) {
            return res.status(400).json({ msg: "Business not found" });
        }

        // Get rosters for locations belonging to the business
        const locations = await Location.find({
            business: business._id,
        }).select("_id");
        const locationIds = locations.map((loc) => loc._id);

        const rosters = await Roster.find({ location: { $in: locationIds } })
            .populate("location")
            .lean(); // Use lean() to get plain JavaScript objects

        // Add hasShifts property to each roster
        const rosterIds = rosters.map((roster) => roster._id);
        const shifts = await Shift.aggregate([
            { $match: { roster: { $in: rosterIds } } },
            { $group: { _id: "$roster", count: { $sum: 1 } } },
        ]);

        const shiftsMap = {};
        shifts.forEach((shift) => {
            shiftsMap[shift._id.toString()] = shift.count;
        });

        const rostersWithShifts = rosters.map((roster) => ({
            ...roster,
            hasShifts: !!shiftsMap[roster._id.toString()],
        }));

        res.json({ rosters: rostersWithShifts });
    } catch (err) {
        console.error("Error fetching rosters:", err.message);
        res.status(500).send("Server error");
    }
};

// Get a specific roster by ID
exports.getRosterById = async (req, res) => {
    try {
        const roster = await Roster.findById(req.params.id).populate(
            "location"
        );

        if (!roster) {
            return res.status(404).json({ msg: "Roster not found" });
        }

        // Check if the roster belongs to the user's business
        const business = await Business.findOne({ owner: req.session.userId });
        if (!business || !roster.location.business.equals(business._id)) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        res.json({ roster });
    } catch (err) {
        console.error("Error fetching roster:", err.message);
        res.status(500).send("Server error");
    }
};

// Update a roster
exports.updateRoster = async (req, res) => {
    const { name, locationId, startDate, endDate } = req.body;

    try {
        let roster = await Roster.findById(req.params.id).populate("location");

        if (!roster) {
            return res.status(404).json({ msg: "Roster not found" });
        }

        // Check if the roster belongs to the user's business
        const business = await Business.findOne({ owner: req.session.userId });
        if (!business || !roster.location.business.equals(business._id)) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        // Update fields
        roster.name = name || roster.name;

        if (locationId) {
            const location = await Location.findById(locationId);
            if (!location || !location.business.equals(business._id)) {
                return res.status(400).json({ msg: "Invalid location" });
            }
            roster.location = location._id;
        }

        roster.startDate = startDate || roster.startDate;
        roster.endDate = endDate || roster.endDate;

        await roster.save();

        res.json({ roster });
    } catch (err) {
        console.error("Error updating roster:", err.message);
        res.status(500).send("Server error");
    }
};

// Delete a roster
exports.deleteRoster = async (req, res) => {
    try {
        const roster = await Roster.findById(req.params.id).populate(
            "location"
        );

        if (!roster) {
            return res.status(404).json({ msg: "Roster not found" });
        }

        // Check if the roster belongs to the user's business
        const business = await Business.findOne({ owner: req.session.userId });
        if (!business || !roster.location.business.equals(business._id)) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        // Check for associated shifts
        const shiftCount = await Shift.countDocuments({ roster: roster._id });

        if (shiftCount > 0) {
            return res
                .status(400)
                .json({ msg: "Cannot delete roster with associated shifts" });
        }

        // Delete roster
        await roster.deleteOne();

        res.json({ msg: "Roster deleted" });
    } catch (err) {
        console.error("Error deleting roster:", err.message);
        res.status(500).send("Server error");
    }
};
