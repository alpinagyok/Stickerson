import { combineReducers } from "redux";

import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import storeReducer from "./storeReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";

export default combineReducers({
  authStore: authReducer,
  errorsStore: errorReducer,
  storeStore: storeReducer,
  productStore: productReducer,
  cartStore: cartReducer,
});
