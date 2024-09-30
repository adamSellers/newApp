// server/controllers/authController.js
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Register User
exports.registerUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: "Username already taken" });
        }

        // Create new user
        user = new User({
            username,
            password,
        });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save user
        await user.save();

        // Initialize session
        req.session.userId = user._id;

        res.status(201).json({
            user: { id: user._id, username: user.username },
        });
    } catch (err) {
        console.error("Error in registerUser:", err.message);
        res.status(500).send("Server error");
    }
};

// Login User
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Initialize session
        req.session.userId = user._id;

        res.json({ user: { id: user._id, username: user.username } });
    } catch (err) {
        console.error("Error in loginUser:", err.message);
        res.status(500).send("Server error");
    }
};

// Logout User
exports.logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ msg: "Could not log out." });
        } else {
            res.clearCookie("connect.sid");
            return res.json({ msg: "Logout successful" });
        }
    });
};

// Get Authenticated User
exports.getAuthenticatedUser = async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        const user = await User.findById(req.session.userId).select(
            "-password"
        );
        res.json({ user });
    } catch (err) {
        console.error("Error fetching user:", err.message);
        res.status(500).send("Server error");
    }
};
