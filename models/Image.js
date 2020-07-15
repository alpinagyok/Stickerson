const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ImageSchema = new Schema({
  // data: {
  //   type: Buffer,
  //   required: true,
  // },
  // contentType: {
  //   type: String,
  //   required: true,
  // },
  // image: {
  //   type: String,
  //   required: true,
  // },
  url: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});

module.exports = Image = mongoose.model("images", ImageSchema);
