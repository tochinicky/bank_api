// index.js
const express = require("express");
const { connectDB } = require("./config/db");
const authRoutes = require("../src/routes/authRoutes");
const accountRoutes = require("../src/routes/accountRoutes");
const transferRoutes = require("../src/routes/transferRoutes");
const permRoute = require("../src/routes/permissionRoute");
const roleRoute = require("../src/routes/roleRoute");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();

// Apply rate limiting middleware
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // Max number of requests within the windowMs time period
  message: "Too many requests, please try again later.",
});
app.use(limiter);

// Connect to MongoDB
connectDB();

// Configure middleware
app.use(express.json());

// API version 1 routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/accounts", limiter, accountRoutes);
app.use("/api/v1/transfers", transferRoutes);
app.use("/api/v1/permissions", permRoute);
app.use("/api/v1/roles", roleRoute);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
