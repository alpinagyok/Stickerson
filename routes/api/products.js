const express = require("express");
const router = express.Router();
const passport = require("passport");
const axios = require("axios");

const { multerUploads, cloudinary } = require("../../config/imageUpload");
const printHeaders = {
  Authorization: `Basic ${
    process.env.PRINTFUL_API_KEY || require("../../config/keys").printful_key
  }`,
};

// Load Input Validation
const validateProductInput = require("../../validation/product");

// Models
const Product = require("../../models/Product");
const Store = require("../../models/Store");
const User = require("../../models/User");

// @route   GET api/products
// @desc    Get all products
// @access  Public
router.get("/", (req, res) => {
  Product.find()
    .populate([
      { path: "user", model: User, select: ["name"] },
      { path: "store", model: Store, select: ["name", "handle"] },
    ])
    .sort({ date: -1 })
    .then((product) => res.json(product))
    .catch((err) =>
      res.status(404).json({ noproductfound: "No product found" })
    );
});

// Not needed?

// @route   GET api/products/my
// @desc    Get current user's products
// @access  Public
router.get(
  "/my",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Product.find({ user: req.user._id })
      .populate([
        { path: "user", model: User, select: ["name"] },
        { path: "store", model: Store, select: ["name", "handle"] },
      ])
      .sort({ date: -1 })
      .then((product) => res.json(product))
      .catch((err) =>
        res.status(404).json({ noproductfound: "No product found" })
      );
  }
);

// @route   GET api/products/store/:id
// @desc    Get specific stores products
// @access  Public
router.get("/store/:id", (req, res) => {
  Product.find({ store: req.params.id })
    .populate([
      { path: "user", model: User, select: ["name"] },
      { path: "store", model: Store, select: ["name", "handle"] },
    ])
    .sort({ date: -1 })
    .then((product) => res.json(product))
    .catch((err) =>
      res.status(404).json({ noproductfound: "No product found" })
    );
});

// @route   GET api/products/:id
// @desc    Get product by id
// @access  Public
router.get("/:id", (req, res) => {
  Product.findById(req.params.id)
    .populate([
      { path: "user", model: User, select: ["name"] },
      { path: "store", model: Store, select: ["name", "handle"] },
    ])
    .then((product) => res.json(product))
    .catch((err) => {
      res.status(404).json({ noproductfound: "No product found with that id" });
    });
});

// TODO: add image edit later (maybe)
// TODO: deprecation warning

// @route   PUT api/products/:id
// @desc    Edit a product
// @access  Private
// @req     name, description, price
// @res     {product}
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let { errors, isValid } = validateProductInput(req.body);
    // Check Validation
    if (!isValid) {
      // Return any errors
      return res.status(400).json(errors);
    }

    Product.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
      },
      { new: true }
    )
      .populate([
        { path: "store", model: Store, select: ["name", "handle"] },
        { path: "user", model: User, select: ["name"] },
      ])
      .then((product) => {
        res.json(product);
      })
      .catch((err) =>
        res
          .status(404)
          .json({ noproductfound: "No product found with this id" })
      );
  }
);

// @route   POST api/products
// @desc    Add a new product
// @access  Private
// @req     image, name, description, price
// @res     {product}
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    multerUploads(req, res, (err) => {
      // TODO in the future: choose the store
      // Check that the user has a store
      Store.findOne({ user: req.user.id }).then((store) => {
        if (store) {
          // Validate input
          let { errors, isValid } = validateProductInput(req.body);
          if (!req.file) {
            errors.image = "No image was given";
            isValid = false;
          }
          if (err) {
            // TODO: can't combine errors with this. + no handling from imageUpload
            return res
              .status(400)
              .json({ image: "Please upload correct image" });
          } else {
            // Check Validation
            if (!isValid) {
              return res.status(400).json(errors);
            }

            // Upload to Cloudinary
            const buf = req.file.buffer.toString("base64");
            cloudinary.uploader.upload(
              "data:image/png;base64," + buf,
              {
                width: 1000, // MIGHT CHANGE
                height: 1000,
                crop: "fill",
                gravity: "auto",
              },
              (err, image) => {
                if (err)
                  return res.status(400).json({ image: "No image found" });
                const newImage = {
                  public_id: image.public_id,
                  url: image.url,
                };

                // Add to DB
                const newProduct = Product({
                  user: req.user._id,
                  store: store._id,
                  name: req.body.name,
                  description: req.body.description,
                  // 5$ is base
                  price: String(Number(req.body.price) + 500),
                  images: [newImage],
                });

                newProduct.save().then((product) => {
                  product.user = req.user;
                  res.json(product);
                });
              }
            );
          }
        } else {
          res
            .status(400)
            .json({ nostore: "Please create a store before posting products" });
        }
      });
    });
  }
);

// @route   POST api/products/print_task
// @desc    Send a mockup task to Printful
// @access  Private
// @req     url
// @res     task_key
router.post(
  "/print_task",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const createdTaskObject = {
      variant_ids: [10165],
      format: "jpg",
      files: [
        {
          placement: "default",
          image_url: req.body.url,
          position: {
            area_width: 1800,
            area_height: 1800,
            width: 1800,
            height: 1800,
            top: 0,
            left: 0,
          },
        },
      ],
    };

    axios
      .post(
        "https://api.printful.com/mockup-generator/create-task/358",
        createdTaskObject,
        {
          headers: printHeaders,
        }
      )
      .then((result) => {
        getPrints(result.data.result.task_key, res);
      })
      .catch((err) => {
        res.status(429).json({ error: "Too many requests. Wait a minute" });
      });
  }
);

// TODO:  CATCH

// @route   POST api/products/print_to_cloud/:prod_id
// @desc    Get completed mockup image from Printful, upload to Cloudinary and push to DB
// @access  Private
// @req     url
// @res     {_id, public_id, url}
router.post(
  "/print_to_cloud/:prod_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.body.url) {
      cloudinary.uploader.upload(
        req.body.url,
        {
          width: 1000, // MIGHT CHANGE
          height: 1000,
          crop: "fill", // MIGTH CHABGE
          gravity: "auto",
        },
        (err, image) => {
          if (err) return res.status(400).json({ image: "No image found" });
          const newImage = {
            public_id: image.public_id,
            url: image.url,
          };
          Product.findOneAndUpdate(
            { _id: req.params.prod_id },
            { $push: { images: newImage } },
            { new: true }
          ).then((product) => {
            return res.json(product.images[1]);
          });
          // res.json(image);
        }
      );
    } else {
      res.status(400).json({ image: "Please attach image" });
    }
  }
);

// Recursive helper function. Sends requests to Printful until mockup image is reqdy
const getPrints = (task_key, res) => {
  axios
    .get(
      `https://api.printful.com/mockup-generator/task?&task_key=${task_key}`,
      {
        headers: printHeaders,
      }
    )
    .then((task_result) => {
      if (task_result.data.result.status !== "completed") {
        getPrints(task_key, res);
      } else {
        const randNum = Math.floor(Math.random() * 3) + 1;
        // Returns random mockup from 3 available
        return res.json({
          url: task_result.data.result.mockups[0].extra[randNum].url,
        });
      }
    })
    .catch((err) => {
      res
        .status(429)
        .json({ error: "Too many requests. Please wait a minute" });
    });
};

// @route   DELETE api/products/:id
// @desc    Delete product by id
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Product.findById(req.params.id)
      .then((product) => {
        // ._id doesn't work here ???
        if (req.user.id === product.user.toString()) {
          product.remove().then(() => {
            res.json({ sucess: true });
          });
        } else {
          res.status(401).json({ notauthorized: "User not authorized" });
        }
      })
      .catch((err) =>
        res.status(404).json({ noproductfound: "No product found" })
      );
  }
);

module.exports = router;
