const Validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = validateStoreInput = (data) => {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.name = !isEmpty(data.name) ? data.name : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle needs to be between 2 and 40 characters";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle is required";
  }

  if (!Validator.isLength(data.name, { min: 6, max: 18 })) {
    errors.name = "Name needs to be between 6 and 18 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Not a valid URL";
    }
  }

  // Maybe TODO: location and bio

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
