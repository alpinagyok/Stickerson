import axios from "axios";

import { GET_ERRORS, SET_MY_STORE, SET_STORE } from "./types";

export const getMyStore = () => (dispatch) => {
  axios.get("/api/stores/my").then((res) =>
    dispatch({
      type: SET_MY_STORE,
      payload: res.data,
    })
  );
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
