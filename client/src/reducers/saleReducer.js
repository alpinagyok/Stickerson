import {
  SET_ALL_SALES,
  SET_SALES_BY_PRODUCT,
  SET_ALL_SALES_MAP,
} from "../actions/types";

import isEmpty from "../validation/is_empty";

const initialState = {
  allSales: null,
  allSalesMap: null,
  salesByProducts: [],
  // loaded: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_SALES:
      return {
        ...state,
        allSales: action.payload,
        // loaded: true,
      };
    case SET_ALL_SALES_MAP: {
      console.log("payload", action.payload);
      return {
        ...state,
        allSalesMap: action.payload,
      };
    }
    // case SET_SALES_BY_PRODUCT: {
    //   const temp = state.orders === null ? [] : state.orders;
    //   return {
    //     ...state,
    //     orders: [action.payload, ...temp],
    //   };
    // }
    default:
      return state;
  }
};
