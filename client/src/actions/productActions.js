import axios from "axios";

import { GET_ERRORS, SET_PRODUCT, SET_PRODUCT_IMG } from "./types";

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

// TODO: url hell... refactor
export const createPrint = (url, prod_id) => (dispatch) => {
  axios
    .post("/api/products/print_task", url)
    .then((res) =>
      axios
        .post(`/api/products/print_to_cloud/${prod_id}`, { url: res.data.url })
        .then((resp) =>
          dispatch({
            type: SET_PRODUCT_IMG,
            payload: resp.data,
          })
        )
    )
    .catch((err) => console.log("err"));
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
