import { SET_MY_STORE, SET_MY_USER, SET_STORE } from "../actions/types";

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
    case SET_STORE:
      return {
        ...state,
        store: action.payload,
      };
    case SET_MY_USER:
      return {
        ...state,
        myStore: {
          ...state.myStore,
          user: action.payload,
        },
      };
    default:
      return state;
  }
};
