const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  balance: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Account", accountSchema);
