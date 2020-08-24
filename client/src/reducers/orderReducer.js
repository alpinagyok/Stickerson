import { SET_ORDERS, ADD_ORDER } from "../actions/types";

const initialState = {
  orders: null,
  loaded: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        orders: action.payload,
        loaded: true,
      };
    case ADD_ORDER: {
      const temp = state.orders === null ? [] : state.orders;
      return {
        ...state,
        orders: [action.payload, ...temp],
      };
    }
    default:
      return state;
  }
};
