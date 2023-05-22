const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, unique: true },
  password: String,
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
});

module.exports = mongoose.model("User", userSchema);
