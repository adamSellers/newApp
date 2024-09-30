// server/routes/businessRoutes.js
const express = require("express");
const router = express.Router();
const {
    createBusiness,
    getBusiness,
    updateBusiness,
} = require("../controllers/businessController");
const auth = require("../middlewares/auth");

// Create Business
router.post("/", auth, createBusiness);

// Get Business
router.get("/", auth, getBusiness);

// Update Business
router.put("/", auth, updateBusiness);

module.exports = router;
