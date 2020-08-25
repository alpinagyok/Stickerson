import axios from "axios";

import { SET_ORDERS, ADD_ORDER, GET_ERRORS, LOAD_CART } from "./types";

export const createOrder = (data, history) => (dispatch) => {
  axios
    .post("/api/orders", data)
    .then((res) => {
      dispatch({
        type: ADD_ORDER,
        payload: res.data,
      });

      // Empty cart
      localStorage.removeItem("cart");
      dispatch({
        type: LOAD_CART,
      });

      history.push("/profile");
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
        type: SET_ORDERS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: SET_ORDERS,
        payload: {},
      })
    );
};
