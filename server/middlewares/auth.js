// server/middlewares/auth.js
module.exports = function (req, res, next) {
    if (req.session && req.session.userId) {
        next();
    } else {
        res.status(401).json({ msg: "Unauthorized" });
    }
};
