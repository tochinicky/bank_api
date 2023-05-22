// controllers/transferController.js
const Transfer = require("../models/Transfer");
const Account = require("../models/Account");

const initiateTransfer = async (req, res) => {
  try {
    // Perform the transfer logic
    try {
      const { senderAccountId, receiverAccountId, amount } = req.body;

      if (isNaN(amount))
        return res.status(400).json({ message: "invalid amount" });
      // Check if sender and receiver accounts exist
      const senderAccount = await Account.findById(senderAccountId);
      const receiverAccount = await Account.findById(receiverAccountId);

      if (!senderAccount || !receiverAccount) {
        return res
          .status(404)
          .json({ message: "One or both accounts not found" });
      }

      // Check if sender has sufficient balance
      if (senderAccount.balance < amount) {
        return res.status(400).json({ message: "Insufficient balance" });
      }

      // Create the transfer
      const transfer = new Transfer({
        sender: senderAccountId,
        receiver: receiverAccountId,
        amount,
      });

      // Deduct amount from sender's account
      senderAccount.balance -= amount;
      await senderAccount.save();

      // Add amount to receiver's account
      receiverAccount.balance += amount;
      await receiverAccount.save();

      // Save the transfer
      await transfer.save();
      res.json({ message: "Transfer initiated successfully" });
    } catch (error) {}
  } catch (error) {
    res.status(500).json({ message: "Failed to initiate transfer" });
  }
};

module.exports = { initiateTransfer };
