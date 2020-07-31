import { LOAD_CART } from "../actions/types";

const initialState = JSON.parse(localStorage.getItem("cart"));

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CART:
      return JSON.parse(localStorage.getItem("cart"));
    default:
      return state;
  }
};
