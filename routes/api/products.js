const express = require("express");
const router = express.Router();
const passport = require("passport");
const axios = require("axios");

const { multerUploads, cloudinary } = require("../../config/imageUpload");

// Load Input Validation
const validateProductInput = require("../../validation/product");

// Product Model
const Product = require("../../models/Product");

// Validation
// const validatePostInput = require("../../validation/post");

// @route   GET api/products/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Products Works" }));

// // @route   GET api/products
// // @desc    Get products
// // @access  Public
// router.get("/", (req, res) => {
//   Product.find()
//     .sort({ date: -1 })
//     .then((product) => res.json(product))
//     .catch((err) =>
//       res.status(404).json({ noproductfound: "No product found" })
//     );
// });

// // @route   GET api/products/:id
// // @desc    Get product by id
// // @access  Public
// router.get("/:id", (req, res) => {
//   Product.findById(req.params.id)
//     .then((product) => res.json(product))
//     .catch((err) =>
//       res.status(404).json({ noproductfound: "No product found with that id" })
//     );
// });

// router.post(
//   "/",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     const { errors, isValid } = validateProductInput(req.body);

//     // Check Validation
//     if (!isValid) {
//       return res.status(400).json(errors);
//     }

//     const newProduct = Product({
//       user: req.user._id,
//       name: req.body.name,
//       description: req.body.description,
//       price: req.body.price,
//     });

//     newProduct.save().then((product) => res.json(product));
//   }
// );

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  multerUploads,
  (req, res) => {
    let { errors, isValid } = validateProductInput(req.body);
    if (!req.file) {
      errors.image = "No image was given";
      isValid = false;
    }

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

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
        if (err) return res.send(err);
        const newImage = {
          public_id: image.public_id,
          url: image.url,
        };

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
);

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

    console.log();
    console.log(222);

    let temp = true;
    axios
      .post(
        "https://api.printful.com/mockup-generator/create-task/358",
        createdTaskObject,
        {
          headers: {
            Authorization: `Basic ${
              process.env.PRINTFUL_API_KEY ||
              require("../../config/keys").printful_key
            }`,
          },
        }
      )
      .then((result) => {
        temp = false;
        console.log(result.data);

        console.log(result.data.result.task_key);

        // axios
        //   .get(
        //     `https://api.printful.com/mockup-generator/task?&task_key=${result.data.result.task_key}`,
        //     {
        //       headers: {
        //         Authorization: `Basic ${
        //           process.env.PRINTFUL_API_KEY ||
        //           require("../../config/keys").printful_key
        //         }`,
        //       },
        //     }
        //   )
        //   .then((task_result) => {
        //     console.log(task_result.data);
        //     res.json(task_result.data);
        //   });

        // console.log(Object.keys(result).length);
        // console.log(1111);
        // if (Object.keys(result).length === 0)
        //   return res.status(429).json({ error: "too many requests" });
        // else res.json(result.data);
        res.json(result.data);
      })
      .catch((err) => {
        console.log("error");
        res.status(429).json({ error: "Too many request. Wait a little" });
      });
    // if (temp) return res.status(404).json({ error: "some error" });
  }
);

router.get("/aa", (req, res) => {
  const createdTaskObject = {
    variant_ids: [10165],
    format: "jpg",
    files: [
      {
        placement: "default",
        image_url:
          "http://res.cloudinary.com/dwwoxasih/image/upload/v1594899834/bk4orrv3sqtscmbxlw7v.jpg",
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
        headers: {
          Authorization: `Basic ${
            process.env.PRINTFUL_API_KEY ||
            require("../../config/keys").printful_key
          }`,
        },
      }
    )
    .then((result) => console.log(result.data))
    .catch((err) => console.log(err.data));
});

module.exports = router;
