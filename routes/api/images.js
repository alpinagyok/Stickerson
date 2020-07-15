const express = require("express");
const router = express.Router();
// const passport = require("passport");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const Image = require("../../models/Image");

router.get("/test", (req, res) => res.json({ success: true }));

cloudinary.config({
  cloud_name:
    process.env.CLOUDINARY_CLOUD_NAME ||
    require("../../config/keys").cloudinary_name,
  api_key:
    process.env.CLOUDINARY_API_KEY ||
    require("../../config/keys").cloudinary_key,
  api_secret:
    process.env.CLOUDINARY_API_SECRET ||
    require("../../config/keys").cloudinary_secret,
});

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single("image");

router.post("/", multerUploads, (req, res) => {
  if (req.file) {
    const buf = req.file.buffer.toString("base64");
    cloudinary.uploader.upload("data:image/png;base64," + buf, function (
      err,
      image
    ) {
      if (err) return res.send(err);
      // return image details
      res.json(image);
    });
  } else {
    res.status(400).json({ error: "no image" });
  }
});

module.exports = router;
