const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Input Validation
const validateOrderInput = require("../../validation/order");

// Models
const Product = require("../../models/Product");
const Order = require("../../models/Order");

// // @route   GET api/orders
// // @desc    Get orders by current user
// // @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Order.find({ user: req.user._id })
      .sort({ date: -1 })
      .then((order) => res.json(order))
      .catch((err) =>
        res.status(404).json({ noorderfound: "No orders found" })
      );
  }
);

// // @route   GET api/orders/:id
// // @desc    Get order by id
// // @access  Public
router.get("/:id", (req, res) => {
  Order.findById(req.params.id)
    .then((order) => res.json(order))
    .catch((err) =>
      res.status(404).json({ noorderfound: "No order found with that id" })
    );
});

// @route   POST api/orders
// @desc    Buy a order
// @access  Private
// @req     [product (id), price, name, image (public_id, url), user, address, phone, delivery-price ]
// @res     {order}
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let { errors, isValid } = validateOrderInput(req.body);
    // Check Validation
    if (!isValid) {
      // Return any errors
      return res.status(400).json(errors);
    }

    const ids = req.body.products.map((prod) => prod._id);

    Product.find({ _id: { $in: ids } })
      .then((allProducts) => {
        let promises = [];

        for (i = 0; i < allProducts.length; i++) {
          // console.log(allProducts[i]);
          const { bought } = allProducts[i];
          console.log(bought);
          let purchaseIndex = -1;

          console.log(bought[0].user);
          // Check if user already bought this product once

          // wtf happens here????
          for (i = 0; i < bought.length; i++) {
            // console.log(1);
            // if (bought[i].user.toString() === req.user.id) purchaseIndex = i;
          }
          if (purchaseIndex > -1) {
            const { times } = bought[purchaseIndex];

            // Increment the number of bought times
            bought.splice(purchaseIndex, 1, {
              user: req.user.id,
              times: times + 1,
            });
          } else {
            // Add user id to bought array
            bought.unshift({ user: req.user.id });
          }
          // // Save
          // // console.log(allProducts[i]);
          promises.push(allProducts[i].save());
        }

        return Promise.all(promises);
      })
      .then((resp, err) => {
        if (!err) res.json(11);
        else res.json(err);
      })
      .catch((err) => {
        console.log(err);
        res.json("err");
        // reject({ productnotfound: "No product found" })
        // new Error({ productnotfound: "No product found" })
      });

    // console.log(promises);
    // Promise.all(promises)
    //   .then(res.json(111))
    //   .catch((err) => res.json(err));
  }
);

module.exports = router;
