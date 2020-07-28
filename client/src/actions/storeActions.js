import axios from "axios";

import {
  GET_ERRORS,
  SET_MY_STORE,
  SET_STORE,
  GET_LOADED_STORE,
  SET_MY_BACKGROUND,
  CLEAR_ERRORS,
} from "./types";

export const getMyStore = () => (dispatch) => {
  axios.get("/api/stores/my").then((res) =>
    dispatch({
      type: SET_MY_STORE,
      payload: res.data,
    })
  );
};

// return state
export const getMyLoadedStore = () => (dispatch) => {
  dispatch({
    type: GET_LOADED_STORE,
  });
};

// handle null
export const getStoreByHandle = (handle) => (dispatch) => {
  axios.get(`/api/stores/handle/${handle}`).then((res) =>
    dispatch({
      type: SET_STORE,
      payload: res.data,
    })
  );
};

export const createStore = (data, history) => (dispatch) => {
  axios
    .post("/api/stores", data)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: SET_MY_STORE,
        payload: res.data,
      });
      history.push("/mystore");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const changeBackground = (formData) => (dispatch) => {
  axios
    .post("api/stores/background", formData)
    .then((res) => {
      dispatch({
        type: CLEAR_ERRORS,
      });
      dispatch({
        type: SET_MY_BACKGROUND,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
