const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, // owner
    ref: "users",
  },
  store: {
    type: Schema.Types.ObjectId,
    ref: "store", // for future functionality
  },
  bought: [
    // which users bought the product
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  price: {
    type: Number, // centcs
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  // Not sure which is the best way yet
  images: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  // image: {
  //   public_id: {
  //     type: String,
  //   },
  //   url: {
  //     type: String,
  //   },
  // },
  // image_print: {
  //   public_id: {
  //     type: String,
  //   },
  //   url: {
  //     type: String,
  //   },
  // },
  date: {
    type: Date,
    default: Date.now,
  },
  reviews: [
    {
      // will display "deleted" if no user found
      // or leave avatar url and name???
      user: {
        type: Schema.Types.ObjectId, // so that the user can delete
        ref: "users",
      },
      // name: {
      //   type: String,
      //   required: true,
      // },
      // avatar: {
      //   public_id: {
      //     type: String,
      //     // required: true,
      //   },
      //   url: {
      //     type: String,
      //     // required: true,
      //   },
      // },
      date: {
        type: Date,
        default: Date.now,
      },
      heading: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      stars: {
        type: Number,
        required: true,
      },
      // For later maybe
      // likes: [
      //   {
      //     user: {
      //       type: Schema.Types.ObjectId,
      //       ref: "users",
      //     },
      //   },
      // ],
    },
  ],
});

module.exports = Product = mongoose.model("products", ProductSchema);
