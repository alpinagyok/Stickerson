const Validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = validateProductInput = (data) => {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.price = !isEmpty(data.price) ? data.price : "";

  if (!Validator.isLength(data.name, { min: 2, max: 15 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  // detects only strings
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (!Validator.isLength(data.description, { min: 6, max: 30 })) {
    errors.description = "Description must be at least 6 characters (30 max)";
  }

  // detects only strings
  if (Validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  }

  const price = Math.floor(Number(data.price));
  if (price === Infinity || String(price) !== data.price || price < 0) {
    errors.price = "Price must be a proper number";
  }

  // detects only strings
  if (Validator.isEmpty(data.price.toString())) {
    errors.price = "Price field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
