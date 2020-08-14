import {
  SET_PRODUCT,
  SET_PRODUCTS,
  SET_MY_PRODUCTS,
  ADD_MY_PRODUCT,
  GET_LOADED_PRODUCT,
  SET_PRODUCT_IMG,
  DELETE_PRODUCT,
  EDIT_MY_PRODUCT,
} from "../actions/types";

import isEmpty from "../validation/is_empty";

const initialState = {
  product: {},
  products: null,
  myProducts: null,
  myProductsLoaded: false,
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
        myProductsLoaded: true,
      };
    case ADD_MY_PRODUCT: {
      const temp = state.myProducts === null ? [] : state.myProducts;
      return {
        ...state,
        myProducts: [action.payload, ...temp],
      };
    }
    case EDIT_MY_PRODUCT: {
      return {
        ...state,
        myProducts:
          // If myProducts are not yet loaded don't do anything
          state.myProducts === null
            ? null
            : state.myProducts.map((myProduct) =>
                myProduct._id === action.payload._id
                  ? // transform the one with a matching id
                    action.payload
                  : // otherwise return original myProduct
                    myProduct
              ),
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
    case DELETE_PRODUCT:
      if (!isEmpty(state.myProducts))
        return {
          ...state,
          myProducts: state.myProducts.filter(
            (myProduct) => myProduct._id !== action.payload
          ),
        };
      else return { ...state };
    default:
      return state;
  }
};
