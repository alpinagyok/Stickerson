import {
  SET_PRODUCT,
  SET_PRODUCTS,
  SET_MY_PRODUCTS,
  ADD_MY_PRODUCT,
  GET_LOADED_PRODUCT,
  SET_PRODUCT_IMG,
} from "../actions/types";

const initialState = {
  product: {},
  products: null,
  myProducts: null,
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
    case SET_MY_PRODUCTS:
      return {
        ...state,
        myProducts: action.payload,
      };
    case ADD_MY_PRODUCT: {
      const temp = state.myProducts === null ? [] : state.myProducts;
      return {
        ...state,
        myProducts: [action.payload, ...temp],
      };
    }
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
