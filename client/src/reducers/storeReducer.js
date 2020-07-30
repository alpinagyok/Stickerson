import {
  SET_MY_STORE,
  SET_MY_USER,
  SET_STORE,
  GET_LOADED_STORE,
  SET_MY_BACKGROUND,
  SET_STORES,
} from "../actions/types";

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
    case SET_STORES:
      return {
        ...state,
        stores: action.payload,
      };
    case SET_MY_USER:
      return {
        ...state,
        myStore: {
          ...state.myStore,
          user: action.payload,
        },
      };
    case SET_MY_BACKGROUND:
      return {
        ...state,
        myStore: {
          ...state.myStore,
          backgroundImg: action.payload,
        },
      };
    case GET_LOADED_STORE:
      // change myStore to trigger WillReceiveProps
      return { ...state, myStore: state.myStore };
    default:
      return state;
  }
};
