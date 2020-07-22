const Validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = validateStoreInput = (data) => {
  let errors = {};

  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.address = !isEmpty(data.address)
    ? data.address
    : { country: "", city: "", street: "" };
  data.address.country = !isEmpty(data.address.country)
    ? data.address.country
    : "";
  data.address.city = !isEmpty(data.address.city) ? data.address.city : "";
  data.address.street = !isEmpty(data.address.street)
    ? data.address.street
    : "";

  if (!Validator.isMobilePhone(data.phone)) {
    errors.phone = "Not a valid phone number";
  }

  if (Validator.isEmpty(data.phone)) {
    errors.handle = "Phone number is required";
  }

  if (Validator.isEmpty(data.address.country)) {
    errors.country = "Country field is required";
  }

  if (Validator.isEmpty(data.address.city)) {
    errors.city = "City field is required";
  }

  if (Validator.isEmpty(data.address.street)) {
    errors.street = "Street field is required";
  }

  if (isEmpty(data.products)) {
    errors.products = "No products to order";
  }

  // Maybe TODO: validate address' existence

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
