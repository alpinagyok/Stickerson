const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, // owner
    ref: users,
  },
  price: {
    type: Float32Array,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  // image: {
  //   // TODO
  // },
  date: {
    type: Date,
    default: Date.now,
  },
  reviews: [
    {
      user: {
        type: Schema.Types.ObjectId, // so that the user can delete
        ref: users,
      },
      name: {
        type: String,
        required: true,
      },
      // avatar: {
      //   type: String,
      // },
      date: {
        type: Date,
        default: Date.now,
      },
      text: {
        type: String,
        required: true,
      },
      stars: {
        type: Int8Array,
        required: true,
      },
      likes: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "users",
          },
        },
      ],
    },
  ],
});

module.exports = Product = mongoose.model("products", ProductSchema);
