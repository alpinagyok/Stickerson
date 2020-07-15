const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");
const passport = require("passport");

// Product Model
const Product = require("../../models/Product");

// Validation
// const validatePostInput = require("../../validation/post");

// @route   GET api/products/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Products Works" }));

// @route   GET api/products
// @desc    Get products
// @access  Public
router.get("/", (req, res) => {
  Product.find()
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
    .then((product) => res.json(product))
    .catch((err) =>
      res.status(404).json({ noproductfound: "No product found with that id" })
    );
});

module.exports = router;
