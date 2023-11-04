const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  login: String,
  password: String,
  isAdmin: { type: Boolean, default: true },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
