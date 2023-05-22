// controllers/accountController.js
const Account = require("../models/Account");
const User = require("../models/User");

const getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: "Failed to get accounts" });
  }
};

const createAccount = async (req, res) => {
  try {
    const user = req.user;
    //check if the user exist
    const getUser = await User.findById(user._id).populate("role");
    if (!getUser) res.status(404).json({ message: "user not found" });

    //check if the user has an existing account
    const existingAccount = await Account.findOne({ user: getUser._id });
    if (existingAccount)
      res
        .status(409)
        .json({
          message: `you already have an account with accountId--${existingAccount._id}`,
        });
    // Create a new account
    const account = new Account({
      user: getUser._id,
    });

    // Save the account to the database
    await account.save();

    res.status(201).json({
      message: "Account created successfully",
      accountId: account._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create account" });
  }
};

module.exports = { getAllAccounts, createAccount };
