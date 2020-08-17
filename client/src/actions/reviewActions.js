import axios from "axios";

import { GET_ERRORS, SET_PRODUCT, CLEAR_ERRORS } from "./types";

export const createReview = (data, prod_id, closeModal) => (dispatch) => {
  axios
    .post(`/api/reviews/${prod_id}`, data)
    .then((res) => {
      dispatch({
        type: SET_PRODUCT,
        payload: res.data,
      });
      dispatch({
        type: CLEAR_ERRORS,
      });
      closeModal();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const deleteReview = (prod_id, closeModal) => (dispatch) => {
  axios
    .delete(`/api/reviews/${prod_id}`)
    .then((res) => {
      dispatch({
        type: SET_PRODUCT,
        payload: res.data,
      });
      dispatch({
        type: CLEAR_ERRORS,
      });
      closeModal();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
