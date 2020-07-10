import isEmpty from "../validation/is_empty";

import { SET_CURRENT_USER } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload), // if the user is there, it's true
        user: action.payload,
      };
    default:
      return state;
  }
};
