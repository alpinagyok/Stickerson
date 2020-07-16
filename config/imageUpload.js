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

// router.post(
//   "/",
//   // passport.authenticate("jwt", { session: false }),
//   multerUploads,
//   (req, res) => {
//     if (req.file) {
//       const buf = req.file.buffer.toString("base64");
//       cloudinary.uploader.upload(
//         "data:image/png;base64," + buf,
//         {
//           width: 400,
//           height: 400,
//           crop: "fill",
//           gravity: "auto",
//         },
//         (err, image) => {
//           if (err) return res.send(err);
//           // return image details
//           res.json({ public_id: image.public_id, url: image.url });
//         }
//       );
//     } else {
//       res.status(400).json({ error: "no image" });
//     }
//   }
// );

const aa = 1;
const bb = 2;

module.exports = { multerUploads, cloudinary };
