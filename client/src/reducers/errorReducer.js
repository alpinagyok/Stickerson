import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload; // payload is going to include err object that comes from server
    case CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
};
