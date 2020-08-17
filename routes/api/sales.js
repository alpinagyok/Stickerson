const express = require("express");
const router = express.Router();
const passport = require("passport");
const axios = require("axios");

// Sale Model
const Sale = require("../../models/Sale");

// @route   GET api/sales
// @desc    Get sales by current user
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Sale.find({ user: req.user._id })
      .sort({ date: -1 })
      .then((sale) => res.json(sale))
      .catch((err) => {
        res.status(404).json({ nosalefound: "No sales found" });
      });
  }
);

// @route   GET api/sales/:prod_id
// @desc    Get sale by product
// @access  Public
router.get("/:prod_id", (req, res) => {
  Sale.find({ product: req.user._id, user: req.user._id })
    .then((sale) => res.json(sale))
    .catch((err) =>
      res.status(404).json({ nosalefound: "No sales found for that product" })
    );
});

module.exports = router;
