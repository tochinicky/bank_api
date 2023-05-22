// routes/transferRoutes.js
const express = require("express");
const router = express.Router();
const transferController = require("../controllers/transferController");
const authenticate = require("../middlewares/authenticationMiddleware");

router.post("/", authenticate, transferController.initiateTransfer);

module.exports = router;
