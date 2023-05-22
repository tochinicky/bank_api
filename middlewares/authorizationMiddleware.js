// middlewares/authorizationMiddleware.js
// authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authorize = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const decodedToken = jwt.decode(req.accessToken);
      const userId = decodedToken.userId;

      const user = await User.findById(userId).populate("role");
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      if (!requiredRole.includes(user.role.name)) {
        return res.status(403).json({ message: "Insufficient permissions" });
      }
      // Store the user in the request object for further processing
      req.user = user;
      next();
    } catch (error) {
      console.error("Token verification error:", error);
      res.status(401).json({ message: "Invalid token" });
    }
  };
};

module.exports = authorize;
