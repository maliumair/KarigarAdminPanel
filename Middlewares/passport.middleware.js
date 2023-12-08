module.exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.status(403).json({ message: "Unauthorized" });
    }
}

module.exports.isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'admin') {
        next();
    }
    else {
        res.status(403).json({ message: "Unauthorized" });
    }
}