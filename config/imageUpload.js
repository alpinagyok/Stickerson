const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const path = require("path");

cloudinary.config({
  cloud_name:
    process.env.CLOUDINARY_CLOUD_NAME || require("./keys").cloudinary_name,
  api_key: process.env.CLOUDINARY_API_KEY || require("./keys").cloudinary_key,
  api_secret:
    process.env.CLOUDINARY_API_SECRET || require("./keys").cloudinary_secret,
});

const storage = multer.memoryStorage();
const multerUploads = multer({
  storage,
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return callback(new Error("Only images are allowed")); // TODO: use this
    }
    callback(null, true);
  },
  limits: {
    fileSize: 2000 * 2000, // MIGHT CHANGE
  },
}).single("image");

module.exports = { multerUploads, cloudinary };
