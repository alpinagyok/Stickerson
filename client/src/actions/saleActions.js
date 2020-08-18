import axios from "axios";

import {
  SET_ALL_SALES,
  SET_SALES_BY_PRODUCT,
  SET_ALL_SALES_MAP,
  SET_SALES_BY_PRODUCT_MAP,
  SET_PRODUCTS_TOTAL_SALES,
  CHANGE_CHART,
} from "./types";

export const changeChart = (id) => (dispatch) => {
  dispatch({
    type: CHANGE_CHART,
    payload: id,
  });
};

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

export const mapSalesToProducts = (sales) => (dispatch) => {
  const saleObj = {};

  for (let i in sales) {
    const sale = sales[i];

    if (saleObj[sale.product] === undefined) saleObj[sale.product] = [sale];
    else saleObj[sale.product].push(sale);
  }

  dispatch({
    type: SET_SALES_BY_PRODUCT,
    payload: saleObj,
  });

  const prodMap = {};
  const prodTotalSales = {};
  for (let i in Object.keys(saleObj)) {
    const prod_id = Object.keys(saleObj)[i];
    prodMap[prod_id] = salesToMap(saleObj[prod_id]);

    const temp = {};
    temp.profit = Object.keys(prodMap[prod_id])
      .map((date) => prodMap[prod_id][date][0])
      .reduce((a, b) => a + b, 0);
    temp.quantity = Object.keys(prodMap[prod_id])
      .map((date) => prodMap[prod_id][date][1])
      .reduce((a, b) => a + b, 0);
    prodTotalSales[prod_id] = temp;
  }

  dispatch({
    type: SET_SALES_BY_PRODUCT_MAP,
    payload: prodMap,
  });
  dispatch({
    type: SET_PRODUCTS_TOTAL_SALES,
    payload: prodTotalSales,
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
