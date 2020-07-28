import axios from "axios";

import { GET_ERRORS, SET_PRODUCT } from "./types";

export const createProduct = (data, history) => (dispatch) => {
  axios
    .post("/api/products", data)
    .then((res) => {
      // this is kinda pointless?
      // dispatch({
      //   type: SET_PRODUCT,
      //   payload: res.data,
      // });
      // TODO LATER: maybe add extra link if tag "link".
      history.push(`/products/${res.data._id}`);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// TODO: rethink catch
export const getProduct = (id) => (dispatch) => {
  axios
    .get(`/api/products/${id}`)
    .then((res) =>
      dispatch({
        type: SET_PRODUCT,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: SET_PRODUCT,
        payload: {},
      })
    );
};
