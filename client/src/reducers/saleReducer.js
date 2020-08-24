import {
  SET_ALL_SALES,
  SET_SALES_BY_PRODUCT,
  SET_SALES_BY_PRODUCT_MAP,
  SET_ALL_SALES_MAP,
  SET_PRODUCTS_TOTAL_SALES,
  CHANGE_CHART,
} from "../actions/types";

const initialState = {
  chartId: "all",
  allSales: null,
  allSalesMap: null,
  salesByProducts: null,
  salesByProductsMap: null,
  productsTotalSales: null,
  // loaded: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CHART:
      return {
        ...state,
        chartId: action.payload,
      };
    case SET_ALL_SALES:
      return {
        ...state,
        allSales: action.payload,
        // loaded: true,
      };
    case SET_ALL_SALES_MAP: {
      return {
        ...state,
        allSalesMap: action.payload,
      };
    }
    case SET_SALES_BY_PRODUCT: {
      return {
        ...state,
        salesByProducts: action.payload,
      };
    }
    case SET_SALES_BY_PRODUCT_MAP: {
      return {
        ...state,
        salesByProductsMap: action.payload,
      };
    }
    case SET_PRODUCTS_TOTAL_SALES: {
      return {
        ...state,
        productsTotalSales: action.payload,
      };
    }
    default:
      return state;
  }
};
