// config/db.js
const mongoose = require("mongoose");
const redis = require("redis");

// Redis client setup
const redisClient = redis.createClient();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
};
redisClient.connect();
redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.on("error", (err) => {
  console.error("Redis connection error:", err);
});
redisClient.on("ready", () => {
  console.log("Redis is ready");
});

redisClient.on("end", () => {
  console.log("Redis connection ended");
});

process.on("SIGINT", () => {
  redisClient.quit();
});

redisClient
  .connect()
  .then(() => {
    console.log("Connected to Redis");
  })
  .catch((err) => {
    console.log(err.message);
  });

module.exports = { connectDB, redisClient };
