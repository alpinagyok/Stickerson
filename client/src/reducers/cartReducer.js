import { LOAD_CART } from "../actions/types";

const calcTotal = (items) => {
  // return items.reduce((a, b) => a.price * a.quantity + b.price * b.quantity);
  let total = 0;
  for (let i in items) {
    total = total + items[i].price * items[i].quantity;
  }
  return total;
};

const calcCount = (items) => {
  // return items.reduce((a, b) => a.quantity + b.quantity);
  let count = 0;
  for (let i in items) {
    count += items[i].quantity;
  }
  return count;
};

const cartItems = JSON.parse(localStorage.getItem("cart"));
const initialState = {
  items: cartItems === null ? [] : cartItems,
  count: calcCount(cartItems),
  total: calcTotal(cartItems),
};

export default (state = initialState, action) => {
  switch (action.type) {
    // TODO: make normal dispatches
    case LOAD_CART:
      const cartItems = JSON.parse(localStorage.getItem("cart"));
      return {
        items: cartItems,
        count: calcCount(cartItems),
        total: calcTotal(cartItems),
      };
    default:
      return state;
  }
};
