const express = require("express");
const router = express.Router();
const passport = require("passport");
const axios = require("axios");

// TODO: Load Input Validation
const validateReviewInput = require("../../validation/review");

// Product Model
const Product = require("../../models/Product");

// TODO: res product?
// TODO: made review validation

// @route   POST api/reviews/:prod_id
// @desc    Add a new product
// @access  Private
// @req     image, name, description, price
// @res     {product}
router.post(
  "/:prod_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let { errors, isValid } = validateReviewInput(req.body);
    // Check Validation
    if (!isValid) {
      // Return any errors
      return res.status(400).json(errors);
    }

    // Check if the user bought the product
    Product.findById(req.params.prod_id)
      .then((product) => {
        // if (product.bought.indexOf(req.user._id) >= 0) {

        // product.bought.map((buyer) => console.log(buyer.user));
        if (
          product.bought.filter(
            (buyer) => buyer.user.toString() === req.user.id // once there was no user, check buy method
          ).length > 0
        ) {
          // TODO: validate that this isn't 2nd review
          const newReview = {
            heading: req.body.heading,
            text: req.body.text,
            stars: req.body.stars,
          };

          product.reviews.unshift(newReview);

          product.save().then((newProduct) => res.json(newProduct));
        } else
          res.status(400).json({
            notbought: "You can't leave a review without buying the product",
          });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .json({ noproductfound: "No product found with this id" });
      });
  }
);

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

    // TODO: probably rewrite
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

module.exports = router;
