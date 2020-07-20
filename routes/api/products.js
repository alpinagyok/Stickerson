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

// Product Model
const Product = require("../../models/Product");

// @route   GET api/products/test
// @desc    Tests post route
// @access  Public
router.get("/test/:id", (req, res) => res.json(req.params.id));

// // @route   GET api/products
// // @desc    Get all products
// // @access  Public
router.get("/", (req, res) => {
  Product.find()
    .sort({ date: -1 })
    .then((product) => res.json(product))
    .catch((err) =>
      res.status(404).json({ noproductfound: "No product found" })
    );
});

// Not needed?

// // @route   GET api/products/my
// // @desc    Get current user's products
// // @access  Public
router.get(
  "/my",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Product.find({ user: req.user._id })
      .sort({ date: -1 })
      .then((product) => res.json(product))
      .catch((err) =>
        res.status(404).json({ noproductfound: "No product found" })
      );
  }
);

// // @route   GET api/products/user/:id
// // @desc    Get specific users products
// // @access  Public
router.get("/user/:id", (req, res) => {
  Product.find({ user: req.params.id })
    .sort({ date: -1 })
    .then((product) => res.json(product))
    .catch((err) =>
      res.status(404).json({ noproductfound: "No product found" })
    );
});

// // @route   GET api/products/:id
// // @desc    Get product by id
// // @access  Public
router.get("/:id", (req, res) => {
  Product.findById(req.params.id)
    .then((product) => res.json(product))
    .catch((err) =>
      res.status(404).json({ noproductfound: "No product found with that id" })
    );
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
      .then((product) => res.json(product))
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
      // Validate input
      let { errors, isValid } = validateProductInput(req.body);
      if (!req.file) {
        errors.image = "No image was given";
        isValid = false;
      }
      if (err) {
        // TODO: can't combine errors with this. + no handling from imageUpload
        return res.status(400).json({ image: "Please upload correct image" });
      } else {
        // Check Validation
        if (!isValid) {
          return res.status(400).json(errors);
        }

        // TODO: check if second image already got uploaded, if so return it

        // Upload to Cloudinary
        const buf = req.file.buffer.toString("base64");
        cloudinary.uploader.upload(
          "data:image/png;base64," + buf,
          {
            width: 500, // MIGHT CHANGE
            height: 500,
            crop: "fill",
            gravity: "auto",
          },
          (err, image) => {
            if (err) return res.status(400).json({ image: "No image found" });
            const newImage = {
              public_id: image.public_id,
              url: image.url,
            };

            // Add to DB
            const newProduct = Product({
              user: req.user._id,
              name: req.body.name,
              description: req.body.description,
              price: req.body.price,
              images: [newImage],
            });

            newProduct.save().then((product) => res.json(product));
          }
        );
      }
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
          width: 600, // MIGHT CHANGE
          height: 600,
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
      } else return res.json(task_result.data.result.mockups[0]);
    })
    .catch((err) => {
      res
        .status(429)
        .json({ error: "Too many requests. Please wait a minute" });
    });
};

// @route   DELETE api/products/:id
// @desc    Delete priduct by id
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

// TODO: redo properly. currently the same id will be there many times

// @route   POST api/products/buy/:id
// @desc    Buy a product
// @access  Private
// @res     TODO: rethink. just success??
router.post(
  "/buy/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Product.findById(req.params.id)
      .then((product) => {
        // if (
        //   product.bought.filter((buyer) => buyer.user.toString() === req.user.id)
        //     .length > 0
        // ) {
        //   return res
        //     .status(400)
        //     .json({ alreadybought: "User already bought this product" });
        // }

        // Add user id to likes array
        product.bought.unshift({ user: req.user.id });

        product.save().then((product) => res.json(product));
      })
      .catch((err) =>
        res.status(404).json({ productnotfound: "No product found" })
      );
  }
);

module.exports = router;
