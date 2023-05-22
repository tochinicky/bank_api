// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const permController = require("../controllers/permissionController");

router.post("/create", permController.createPermissions);

module.exports = router;
