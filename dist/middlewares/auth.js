"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = void 0;
const adminAuth = (req, res, next) => {
    const userRole = req.headers["role"];
    if (userRole === "admin") {
        return next();
    }
    else {
        res.status(403).json({ Message: "Unauthorized" });
    }
};
exports.adminAuth = adminAuth;
