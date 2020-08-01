import { GET_ORDERS, ADD_ORDER } from "../actions/types";

import isEmpty from "../validation/is_empty";

const initialState = {
  orders: null,
  loaded: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS:
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
