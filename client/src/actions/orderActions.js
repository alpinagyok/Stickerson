import axios from "axios";

import { GET_ORDERS, GET_ORDER, ADD_ORDER, GET_ERRORS } from "./types";

export const createOrder = (data, history) => (dispatch) => {
  axios
    .post("/api/orders", data)
    .then((res) => {
      dispatch({
        type: ADD_ORDER,
        payload: res.data,
      });
      history.push("/orders");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getOrders = () => (dispatch) => {
  axios
    .get("/api/orders")
    .then((res) =>
      dispatch({
        type: GET_ORDERS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ORDERS,
        payload: {},
      })
    );
};
