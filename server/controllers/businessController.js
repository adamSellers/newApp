// server/controllers/businessController.js
const Business = require("../models/Business");
const User = require("../models/User");

// Create Business
exports.createBusiness = async (req, res) => {
    const { name } = req.body;

    try {
        // Check if user already has a business
        const existingBusiness = await Business.findOne({
            owner: req.session.userId,
        });
        if (existingBusiness) {
            return res.status(400).json({ msg: "User already has a business" });
        }

        // Create new business
        const business = new Business({
            name,
            owner: req.session.userId,
        });

        await business.save();

        // Update user with business reference
        await User.findByIdAndUpdate(req.session.userId, {
            business: business._id,
        });

        res.status(201).json({ business });
    } catch (err) {
        console.error("Error creating business:", err.message);
        res.status(500).send("Server error");
    }
};

// Get Business
exports.getBusiness = async (req, res) => {
    try {
        const business = await Business.findOne({ owner: req.session.userId });
        if (!business) {
            return res.status(404).json({ msg: "Business not found" });
        }
        res.json({ business });
    } catch (err) {
        console.error("Error fetching business:", err.message);
        res.status(500).send("Server error");
    }
};

// Update Business
exports.updateBusiness = async (req, res) => {
    const { name } = req.body;

    try {
        const business = await Business.findOneAndUpdate(
            { owner: req.session.userId },
            { name },
            { new: true }
        );
        if (!business) {
            return res.status(404).json({ msg: "Business not found" });
        }
        res.json({ business });
    } catch (err) {
        console.error("Error updating business:", err.message);
        res.status(500).send("Server error");
    }
};
