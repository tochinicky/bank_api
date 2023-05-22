// controllers/authController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { redisClient } = require("../config/db");

const signup = async (req, res) => {
  try {
    const { name, email, password, role, username } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      username: username,
      role: role,
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }).populate("role");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const passwordMatch = bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate access token
    const accessToken = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      "access-token-secret",
      { expiresIn: "15m" } // Set an appropriate expiration time
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      "refresh-token-secret",
      { expiresIn: "30d" } // Set an appropriate expiration time
    );

    // Store the refresh token in Redis
    await redisClient.set(user._id.toString(), refreshToken);

    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: "Failed to login" });
  }
};

const refreshToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token not provided" });
  }

  // Verify the refresh token
  jwt.verify(refreshToken, "refresh-token-secret", (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const userId = decoded.userId;

    // Check if the refresh token is valid in Redis
    redisClient.get(userId, (redisErr, storedRefreshToken) => {
      if (redisErr) {
        console.error("Redis error:", redisErr);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (refreshToken !== storedRefreshToken) {
        return res.status(401).json({ message: "Invalid refresh token" });
      }

      // Generate a new access token
      const accessToken = jwt.sign({ userId }, "access-token-secret", {
        expiresIn: "15m",
      });

      res.json({ accessToken });
    });
  });
};

module.exports = { signup, login, refreshToken };
