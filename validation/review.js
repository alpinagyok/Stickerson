const Validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = validateReviewInput = (data) => {
  let errors = {};

  data.heading = !isEmpty(data.heading) ? data.heading : "";
  data.text = !isEmpty(data.text) ? data.text : "";
  data.stars = !isEmpty(data.stars) ? data.stars : "";

  if (!Validator.isLength(data.heading, { min: 3, max: 20 })) {
    errors.heading = "Heading must be between 3 and 20 characters";
  }

  if (Validator.isEmpty(data.heading)) {
    errors.heading = "Heading field is required";
  }

  if (!Validator.isLength(data.text, { min: 10, max: 200 })) {
    errors.text = "Review text must be at least 10 characters (200 max)";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Review text field is required";
  }

  // From 1 to 5 stars
  const stars = Math.floor(Number(data.stars));
  if (
    stars === Infinity ||
    String(stars) !== data.stars ||
    stars < 1 ||
    stars > 5
  ) {
    errors.stars = "Stars must be a proper number";
  }

  if (Validator.isEmpty(data.stars.toString())) {
    errors.stars = "Stars field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
