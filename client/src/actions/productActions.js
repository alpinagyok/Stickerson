import axios from "axios";

import {
  GET_ERRORS,
  SET_PRODUCT,
  SET_PRODUCTS,
  SET_MY_PRODUCTS,
  ADD_MY_PRODUCT,
  SET_PRODUCT_IMG,
  CLEAR_ERRORS,
} from "./types";

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
      dispatch({
        type: ADD_MY_PRODUCT,
        payload: res.data,
      });
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
        .then((resp) => {
          dispatch({
            type: SET_PRODUCT_IMG,
            payload: resp.data,
          });
          dispatch({
            type: CLEAR_ERRORS,
          });
        })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
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

export const getProducts = () => (dispatch) => {
  axios
    .get("/api/products")
    .then((res) =>
      dispatch({
        type: SET_PRODUCTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: SET_PRODUCTS,
        payload: {},
      })
    );
};

export const getProductsByStore = (store) => (dispatch) => {
  axios
    .get(`/api/products/store/${store}`)
    .then((res) =>
      dispatch({
        type: SET_PRODUCTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: SET_PRODUCTS,
        payload: {},
      })
    );
};

export const getMyProducts = () => (dispatch) => {
  axios
    .get("/api/products/my")
    .then((res) =>
      dispatch({
        type: SET_MY_PRODUCTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: SET_MY_PRODUCTS,
        payload: {},
      })
    );
};
