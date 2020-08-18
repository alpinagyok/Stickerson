import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  CHANGE_AVATAR,
  CLEAR_ERRORS,
  SET_MY_STORE,
  SET_MY_USER,
  SET_MY_PRODUCTS,
  SET_ORDERS,
  SET_ALL_SALES,
  SET_SALES_BY_PRODUCT,
} from "./types";

// Register User                        // better way that putting dispatch (thunk) function inside dispatch
export const registerUser = (userData) => (dispatch) => {
  // we are dealing with async data
  axios
    .post("/api/users/register", userData)
    .then((res) => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls (ls only stores strings)
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      // since we are making an ajax call and waiting for a response, we're not gonna return type and payload, we have to call dispatch
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Login - Get User Token
export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls (ls only stores strings)
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  // localStorage.setItem("userAvatar", decoded.avatar);
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove toke fron localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));

  // Clear everything
  dispatch({
    type: SET_MY_STORE,
    payload: "empty",
  });
  dispatch({
    type: SET_MY_PRODUCTS,
    payload: null,
  });
  dispatch({
    type: SET_ORDERS,
    payload: null,
  });
  dispatch({
    type: SET_ALL_SALES,
    payload: null,
  });
  dispatch({
    type: SET_SALES_BY_PRODUCT,
    payload: null,
  });
};

export const changeAvatar = (formData) => (dispatch) => {
  axios
    .post("api/users/avatar", formData)
    .then((res) => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls (ls only stores strings)
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      // Change user in myStore
      dispatch({
        type: SET_MY_USER,
        payload: decoded,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// TODO maybe: make errorActions for this?
export const clearErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
