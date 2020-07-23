const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Input Validation
const validateOrderInput = require("../../validation/order");

// Models
const Product = require("../../models/Product");
const Order = require("../../models/Order");
const product = require("../../validation/product");

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
// @req     [product (id), quantity], user, address, phone
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
        let productsForOrder = [];

        // TODO LATER: return those products
        if (allProducts.length !== ids.length)
          return res
            .status(404)
            .json({ productsnotfound: "Some of the products are not found" });

        for (i = 0; i < allProducts.length; i++) {
          const { bought } = allProducts[i];
          let purchaseIndex = -1;

          // How many of the same product are in an order
          const quantityInCart = req.body.products.filter(
            (prod) => prod._id === allProducts[i]._id.toString()
          )[0].quantity;

          // Check if user already bought this product once
          for (j = 0; j < bought.length; j++) {
            if (bought[j].user.toString() === req.user.id) purchaseIndex = j;
          }
          if (purchaseIndex > -1) {
            const { quantity } = bought[purchaseIndex];

            // Increment the number of bought quantity
            bought.splice(purchaseIndex, 1, {
              user: req.user.id,
              quantity: quantity + quantityInCart,
            });
          } else {
            // Add user id to bought array
            bought.unshift({ user: req.user.id, quantity: quantityInCart });
          }
          // Save
          promises.push(allProducts[i].save());

          // Prepare product object for order
          productsForOrder.push({
            // TODO: change to _id??
            prod_id: allProducts[i]._id,
            name: allProducts[i].name,
            price: allProducts[i].price,
            image: allProducts[i].images[0].url,
            quantity: quantityInCart,
          });
        }

        // After every product is "bought", create order
        Promise.all(promises).then(() => {
          const newOrder = Order({
            products: productsForOrder,
            user: req.user.id,
            address: req.body.address,
            phone: req.body.phone,
            deliveryPrice: calculateDelivery(
              productsForOrder,
              req.body.address
            ),
          });

          newOrder.save().then((order) => res.json(order));
        });
      })
      // doesn't really seem to be needed
      .catch(() => {
        res.status(404).json({ products: "Not found" });
      });
  }
);

// MAYBE TODO: normal calculation
const calculateDelivery = (products, address) => {
  return 200 * products.length;
};

module.exports = router;
