import axios from "axios";

import {
  SET_ALL_SALES,
  SET_SALES_BY_PRODUCT,
  SET_ALL_SALES_MAP,
} from "./types";

export const getAllSales = () => (dispatch) => {
  axios.get("/api/sales").then((res) => {
    dispatch({
      type: SET_ALL_SALES,
      payload: res.data,
    });
    dispatch({
      type: SET_ALL_SALES_MAP,
      payload: salesToMap(res.data),
    });
  });
};

const salesToMap = (sales) => {
  const saleObj = {};

  // Sorted to show latest first, but we need it otherwise
  for (let i = sales.length - 1; i >= 0; i--) {
    const sale = sales[i];

    // Get date without time
    var date = String(sale.date).split("T")[0];

    // Each date will have profit and amount of items sold
    const profit =
      Math.round(
        (((sale.price - 500) * sale.quantity) / 100 + Number.EPSILON) * 100
      ) / 100;

    if (saleObj[date] === undefined) saleObj[date] = [profit, sale.quantity];
    else {
      const profQuanList = saleObj[date];
      saleObj[date] = [
        profQuanList[0] + profit,
        profQuanList[1] + sale.quantity,
      ];
    }
  }

  return saleObj;
};
