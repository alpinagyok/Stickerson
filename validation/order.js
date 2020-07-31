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
  data.deliveryPrice = !isEmpty(data.deliveryPrice) ? data.deliveryPrice : "";

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

  const deliveryPrice = Math.floor(Number(data.deliveryPrice));
  if (
    deliveryPrice === Infinity ||
    String(deliveryPrice) !== data.deliveryPrice ||
    deliveryPrice <= 0 ||
    isNaN(data.deliveryPrice)
  ) {
    errors.deliveryPrice = "Delivery price must be a proper number";
  }

  if (Validator.isEmpty(data.deliveryPrice.toString())) {
    errors.deliveryPrice = "Delivery price field is required";
  }

  // Maybe TODO: validate address' existence

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
