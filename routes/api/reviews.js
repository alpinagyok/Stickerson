// TODO GLOBAL: don't return "bought"

const express = require("express");
const router = express.Router();
const passport = require("passport");
const axios = require("axios");

// Load Input Validation
const validateReviewInput = require("../../validation/review");

// Product Model
const Product = require("../../models/Product");

// TODO: res product? maybe review?

// @route   POST api/reviews/:prod_id
// @desc    Add a new review / Edit review
// @access  Private
// @req     heading, text, stars
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
      .populate([
        { path: "user", model: User, select: ["name"] },
        { path: "store", model: Store, select: ["name", "handle"] },
        { path: "reviews.user", model: User, select: ["name", "avatar"] },
      ])
      .then((product) => {
        if (
          product.bought.filter(
            (buyer) => buyer.user.toString() === req.user.id // once there was no user, check buy method
          ).length > 0
        ) {
          const user = {
            _id: req.user._id,
            avatar: req.user.avatar,
            name: req.user.name,
          };

          const newReview = {
            user,
            heading: req.body.heading,
            text: req.body.text,
            stars: req.body.stars,
          };

          // validate that this isn't 2nd review
          let isFirstRev = true;
          let reviewerIndex;

          const { reviews } = product;

          for (i = 0; i < reviews.length; i++) {
            if (reviews[i].user._id.toString() === req.user.id) {
              isFirstRev = false;
              reviewerIndex = i;
            }
          }

          // If first review create, if second update
          if (!isFirstRev) reviews.splice(reviewerIndex, 1, newReview);
          else reviews.unshift(newReview);

          product.save().then((newProduct) => res.json(newProduct));
        } else
          res.status(400).json({
            notbought: "You can't leave a review without buying the product",
          });
      })
      .catch((err) => {
        res
          .status(404)
          .json({ noproductfound: "No product found with this id" });
      });
  }
);

// @route   DELETE api/reviews/:prod_id
// @desc    Delete review by product id
// @access  Private
router.delete(
  "/:prod_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Product.findById(req.params.prod_id)
      .populate([
        { path: "user", model: User, select: ["name"] },
        { path: "store", model: Store, select: ["name", "handle"] },
        { path: "reviews.user", model: User, select: ["name", "avatar"] },
      ])
      .then((product) => {
        const { reviews } = product;

        // Get remove index
        let reviewerIndex = -1;
        for (i = 0; i < reviews.length; i++) {
          if (reviews[i].user._id.toString() === req.user.id) reviewerIndex = i;
        }
        if (reviewerIndex > -1) {
          // Splice out of array
          reviews.splice(reviewerIndex, 1);
          product.save().then((product) => res.json(product));
        } else {
          res.status(404).json({ noreviewfound: "No review foundddd" });
        }
      })
      .catch((err) =>
        res.status(404).json({ noreviewfound: "No review found" })
      );
  }
);

module.exports = router;
