// routes/accountRoutes.js
const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");
const authenticate = require("../middlewares/authenticationMiddleware");
const authorize = require("../middlewares/authorizationMiddleware");

router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  accountController.getAllAccounts
);
router.post(
  "/",
  authenticate,
  authorize(["admin", "user"]),
  accountController.createAccount
);

module.exports = router;
