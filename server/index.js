// server/index.js
require("dotenv").config(); // Load environment variables

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const connectDB = require("./db");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

// route imports
const authRoutes = require("./routes/authRoutes");
const businessRoutes = require("./routes/businessRoutes");
const locationRoutes = require("./routes/locationRoutes");
const shiftTypeRoutes = require("./routes/shiftTypeRoutes");
const rosterRoutes = require("./routes/rosterRoutes");
const shiftRoutes = require("./routes/shiftRoutes");

var app = express();

// Middleware
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

// Connect to MongoDB
connectDB();

// Session Middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI, // Use mongoUrl to connect to your MongoDB
            collectionName: "sessions", // Optional
        }),
        cookie: {
            secure: false, // Set to true if using HTTPS
            httpOnly: true,
            maxAge: 1000 * 60 * 60, // 1 hour
        },
    })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/business", businessRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/shift-types", shiftTypeRoutes);
app.use("/api/rosters", rosterRoutes);
app.use("/api/shifts", shiftRoutes);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
