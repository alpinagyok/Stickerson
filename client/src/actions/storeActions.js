import axios from "axios";

import { GET_ERRORS, SET_MY_STORE, CLEAR_ERRORS } from "./types";

export const getMyStore = () => (dispatch) => {
  axios.get("/api/stores/my").then((res) =>
    dispatch({
      type: SET_MY_STORE,
      payload: res.data,
    })
  );
};
