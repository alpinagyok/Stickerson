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
      // product: {
      //   type: Schema.Types.ObjectId,
      //   ref: "products",
      // },
      price: {
        type: Float32Array,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      // image: {
      //   // TODO:
      // },
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
    type: Float32Array,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Order = mongoose.model("order", OrderSchema);
