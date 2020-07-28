import {
  SET_PRODUCT,
  GET_LOADED_PRODUCT,
  SET_PRODUCT_IMG,
} from "../actions/types";

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
    case SET_PRODUCT_IMG:
      return {
        ...state,
        // maybe it's a bit too much...?
        product: {
          ...state.product,
          images: [...state.product.images, action.payload],
        },
      };
    case GET_LOADED_PRODUCT:
      return { ...state, product: state.product };
    default:
      return state;
  }
};
