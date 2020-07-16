const multer = require("multer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name:
    process.env.CLOUDINARY_CLOUD_NAME || require("./keys").cloudinary_name,
  api_key: process.env.CLOUDINARY_API_KEY || require("./keys").cloudinary_key,
  api_secret:
    process.env.CLOUDINARY_API_SECRET || require("./keys").cloudinary_secret,
});

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single("image");

module.exports = { multerUploads, cloudinary };
