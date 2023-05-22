// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");

router.post("/create", roleController.createRoles);

module.exports = router;
