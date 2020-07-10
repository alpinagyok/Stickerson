const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String, // CHANGE
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// users is the name in DB
module.exports = User = mongoose.model("users", UserSchema);
