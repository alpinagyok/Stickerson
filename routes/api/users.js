const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const { multerUploads, cloudinary } = require("../../config/imageUpload");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");
const Product = require("../../models/Product");
const Store = require("../../models/Store");

// @route   POST api/users/register
// @desc    Register user, return token
// @access  Public
// @req     name, email, password, password2
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      // return res.status(400).json({ email: "Email already exists" });
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = {
        public_id: null,
        url:
          "https://res.cloudinary.com/dwwoxasih/image/upload/v1595839298/default_avatar_clrbq4.png",
      };
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              const payload = {
                id: user.id,
                name: user.name,
                avatar: user.avatar,
              };

              jwt.sign(
                payload,
                process.env.SECRET || require("../../config/keys").secret,
                {
                  expiresIn: 3600, // TODO: refresh
                },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token,
                  });
                }
              );
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route   POST api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
// @req     email, password
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by Email
  User.findOne({ email }).then((user) => {
    // Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User Matched

        // TODO: refactor into func
        // Create JWT Payload
        const payload = { id: user.id, name: user.name, avatar: user.avatar };

        // Sign Token
        jwt.sign(
          payload,
          process.env.SECRET || require("../../config/keys").secret,
          {
            expiresIn: 3600, // TODO: refresh
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// Opt. TODO: cloudinary task can be done asyncly and doens't depend on anything else

// TODO: Delete Store's background image from cloudinary

// @route   DELETE api/users
// @desc    Delete current User + avatar + user's products and store
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const avatar = req.user.avatar.public_id;

    Product.deleteMany({ user: req.user.id }).then(() => {
      Store.findOneAndRemove({ user: req.user.id }).then(() => {
        User.findOneAndRemove({ _id: req.user.id }).then(() => {
          if (avatar !== null) {
            cloudinary.uploader.destroy(avatar, (err, result) => {
              if (err) return res.send(err);
              return res.json({ sucess: true });
            });
          } else res.json({ sucess: true });
        });
      });
    });
  }
);

// @route   POST api/users/avatar
// @desc    Change user's avatar.
// @access  Private
router.post(
  "/avatar",
  passport.authenticate("jwt", { session: false }),
  // multerUploads,
  (req, res) => {
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
              width: 100, // MIGHT CHANGE
              height: 100,
              crop: "fill",
              gravity: "auto",
            },
            (err, image) => {
              if (err) return res.status(400).json({ image: "No image found" });
              const avatar = {
                public_id: image.public_id,
                url: image.url,
              };

              const oldAvatar = req.user.avatar.public_id;

              User.findOneAndUpdate(
                { _id: req.user.id },
                { avatar },
                { new: true } // by default returns old object
                // { useFindAndModify: false } // gives an error for some reason
              ).then((user) => {
                // Create JWT Payload
                const payload = {
                  id: user.id,
                  name: user.name,
                  avatar: user.avatar,
                };

                // Sign Token (so the avatar changes in localStorage)
                jwt.sign(
                  payload,
                  process.env.SECRET || require("../../config/keys").secret,
                  {
                    expiresIn: 3600, // TODO: refresh
                  },
                  (err, token) => {
                    // If user has an avatar, delete it from cloudinary
                    if (oldAvatar !== null) {
                      cloudinary.uploader.destroy(oldAvatar, (err, result) => {
                        if (err) return res.send(err);
                        return res.json({
                          success: true,
                          token: "Bearer " + token,
                        });
                      });
                    } else
                      res.json({
                        success: true,
                        token: "Bearer " + token,
                      });
                  }
                );
              });
            }
          );
        } else {
          res.status(400).json({ image: "No image was given" });
        }
      }
    });
  }
);

module.exports = router;
