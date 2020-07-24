import { SET_MY_STORE } from "../actions/types";

const initialState = {
  myStore: "empty",
  store: {},
  stores: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MY_STORE:
      return {
        ...state,
        myStore: action.payload,
      };
    default:
      return state;
  }
};
