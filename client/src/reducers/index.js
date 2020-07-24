import { combineReducers } from "redux";

import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import storeReducer from "./storeReducer";

export default combineReducers({
  authStore: authReducer,
  errorsStore: errorReducer,
  storeStore: storeReducer,
});
