import axios from "axios";

import { SET_ALL_SALES, SET_SALES_BY_PRODUCT } from "./types";

export const getAllSales = () => (dispatch) => {
  axios.get("/api/sales").then((res) =>
    dispatch({
      type: SET_ALL_SALES,
      payload: res.data,
    })
  );
};
