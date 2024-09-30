// server/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const {
    registerUser,
    loginUser,
    logoutUser,
    getAuthenticatedUser,
} = require("../controllers/authController");
const { check, validationResult } = require("express-validator");
const auth = require("../middlewares/auth");

// Register Route
router.post(
    "/register",
    [
        check("username", "Username is required").notEmpty(),
        check("password", "Password must be at least 6 characters").isLength({
            min: 6,
        }),
    ],
    (req, res) => {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        registerUser(req, res);
    }
);

// Login Route
router.post(
    "/login",
    [
        check("username", "Username is required").notEmpty(),
        check("password", "Password is required").exists(),
    ],
    (req, res) => {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        loginUser(req, res);
    }
);

// Logout Route
router.post("/logout", logoutUser);

// Get Authenticated User
router.get("/user", auth, getAuthenticatedUser);

module.exports = router;
