import { GET_ORDERS, ADD_ORDER } from "../actions/types";

import isEmpty from "../validation/is_empty";

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return action.payload;
    case ADD_ORDER: {
      const temp = state === null ? [] : state;
      return [action.payload, ...temp];
    }
    default:
      return state;
  }
};
