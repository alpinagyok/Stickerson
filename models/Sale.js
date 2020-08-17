const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SaleSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, // owner
    ref: "users",
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "products",
  },
  price: {
    // of one product
    type: Number, // centcs
    required: true,
  },
  quantity: {
    // of one product
    type: Number, // centcs
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Sale = mongoose.model("sales", SaleSchema);
