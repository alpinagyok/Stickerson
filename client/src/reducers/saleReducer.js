import { SET_ALL_SALES, SET_SALES_BY_PRODUCT } from "../actions/types";

import isEmpty from "../validation/is_empty";

const initialState = {
  allSales: null,
  salesByProducts: [],
  // loaded: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_SALES:
      return {
        allSales: action.payload,
        // loaded: true,
      };
    case SET_SALES_BY_PRODUCT: {
      const temp = state.orders === null ? [] : state.orders;
      return {
        ...state,
        orders: [action.payload, ...temp],
      };
    }
    default:
      return state;
  }
};
