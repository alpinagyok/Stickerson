const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, // buyer
    ref: "users",
  },
  products: [
    {
      // To click and view
      product: {
        type: Schema.Types.ObjectId,
        ref: "products",
      },
      // In case the product is already deleted
      price: {
        type: Number, // centcs
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      image: {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    },
  ],
  address: {
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
  },
  phone: {
    type: String,
    required: true,
  },
  deliveryPrice: {
    type: Number, // cents
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Order = mongoose.model("order", OrderSchema);
