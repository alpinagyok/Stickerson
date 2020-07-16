const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const StoreSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, // owner
    ref: "users",
  },
  handle: {
    type: String,
    required: true,
    max: 40,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  backgroundImg: {
    // TODO
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Store = mongoose.model("stores", StoreSchema);
