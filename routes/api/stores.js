// TODO GLOBAL: leave images in users and stores as nothing instead of public_id: null, url: null

const express = require("express");
const router = express.Router();
const passport = require("passport");

const { multerUploads, cloudinary } = require("../../config/imageUpload");

// Load Input Validation
const validateStoreInput = require("../../validation/store");

// Models
const Store = require("../../models/Store");

// Maybe TODO: add ability to edit handle

// @route   POST api/store
// @desc    Create or Edit user store (doesn't include image)
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateStoreInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors
      return res.status(400).json(errors);
    }

    // Get fields
    const storeFields = {};
    storeFields.user = req.user.id;
    if (req.body.handle) storeFields.handle = req.body.handle;
    if (req.body.website) storeFields.website = req.body.website;
    if (req.body.location) storeFields.location = req.body.location;
    if (req.body.name) storeFields.name = req.body.name;
    if (req.body.bio) storeFields.bio = req.body.bio;

    Store.findOne({ user: req.user.id }).then((store) => {
      if (store) {
        // Handle is noneditable
        storeFields.handle = store.handle;
        // Update
        Store.findOneAndUpdate(
          { user: req.user.id },
          { $set: storeFields },
          { new: true }
        ).then((store) => res.json(store));
      } else {
        // Create
        storeFields.backgroundImg = { public_id: null, url: null };

        // Check if handle exists
        Store.findOne({ handle: storeFields.handle }).then((store) => {
          if (store) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }

          // Save store
          new Store(storeFields).save().then((store) => res.json(store));
        });
      }
    });
  }
);

// @route   POST api/store/background
// @desc    Change store's background.
// @access  Private
router.post(
  "/background",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Check if the store exists
    Store.findOne({ user: req.user.id }).then((store) => {
      if (store) {
        multerUploads(req, res, (err) => {
          // checks if the image is wrong size / wrong file type / wrong form-data name
          if (err) {
            return res.status(400).json({
              image:
                "Please upload correct image (png/jpg/jpeg, max size: 2000 * 2000)",
            });
          } else {
            if (req.file) {
              const buf = req.file.buffer.toString("base64");
              cloudinary.uploader.upload(
                "data:image/png;base64," + buf,
                {
                  width: 1000, // MIGHT CHANGE
                  height: 500,
                  crop: "fill",
                  gravity: "auto",
                },
                (err, image) => {
                  if (err)
                    return res.status(400).json({ image: "No image found" });

                  const backgroundImg = {
                    public_id: image.public_id,
                    url: image.url,
                  };

                  const oldImg = store.backgroundImg.public_id;

                  store.backgroundImg = backgroundImg;

                  store.save().then((newStore) => {
                    // If newStore has an backgroundImg, delete it from cloudinary
                    if (oldImg !== null) {
                      cloudinary.uploader.destroy(oldImg, (err, result) => {
                        if (err) return res.send(err); // TODO: change to own errors?
                        return res.json(newStore);
                      });
                    } else res.json(newStore); // maybe return just the backgroundImg???
                  });
                }
              );
            } else {
              res.status(400).json({ image: "No image was given" });
            }
          }
        });
      } else {
        res.status(404).json({ nostore: "No store found" });
      }
    });
  }
);

module.exports = router;
