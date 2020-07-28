import { SET_PRODUCT, GET_LOADED_PRODUCT } from "../actions/types";

const initialState = {
  product: {},
  products: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    case GET_LOADED_PRODUCT:
      return { ...state, product: state.product };
    default:
      return state;
  }
};
