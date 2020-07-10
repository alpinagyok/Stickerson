import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers"; // we called it index, so no need to write it

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  process.env.NODE_ENV === "production"
    ? applyMiddleware(...middleware)
    : compose(
        // compose is just to add devtools
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      )
);

export default store;
