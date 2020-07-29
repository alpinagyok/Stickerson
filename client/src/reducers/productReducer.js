import {
  SET_PRODUCT,
  SET_PRODUCTS,
  GET_LOADED_PRODUCT,
  SET_PRODUCT_IMG,
} from "../actions/types";

const initialState = {
  product: {},
  products: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
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
