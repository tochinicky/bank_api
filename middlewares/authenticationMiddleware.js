// middlewares/authenticationMiddleware.js
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token not provided" });
  }
  // Verify the access token
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        // Access token expired, re-authenticate using the refresh token
        const refreshToken = req.headers["x-refresh-token"];

        if (!refreshToken) {
          return res
            .status(401)
            .json({ message: "Refresh token not provided" });
        }

        jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN,
          (refreshErr, refreshDecoded) => {
            if (refreshErr) {
              return res.status(403).json({ message: "Invalid refresh token" });
            }

            const userId = refreshDecoded.userId;

            // Check if the refresh token is valid in Redis
            redisClient.get(userId, (redisErr, storedRefreshToken) => {
              if (redisErr) {
                console.error("Redis error:", redisErr);
                return res
                  .status(500)
                  .json({ message: "Internal server error" });
              }

              if (refreshToken !== storedRefreshToken) {
                return res
                  .status(401)
                  .json({ message: "Invalid refresh token" });
              }

              // Generate a new access token
              const newAccessToken = jwt.sign(
                { userId },
                process.env.ACCESS_TOKEN,
                { expiresIn: "15m" }
              );

              req.userId = userId;
              req.accessToken = newAccessToken;

              next();
            });
          }
        );
      } else {
        return res.status(401).json({ message: "Invalid access token" });
      }
    } else {
      // Access token valid
      req.accessToken = token;
      next();
    }
  });
};

module.exports = authenticate;
