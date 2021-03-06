import React, { Component } from "react";
import "./App.css"; // TODO: delete App.css or change
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Settings from "./components/settings/Settings";
import StoreFull from "./components/stores/StoreFull";
import CreateProduct from "./components/forms/CreateProduct";
import ProductFull from "./components/products/ProductFull";
import Stores from "./components/stores/Stores";
import Cart from "./components/cart/Cart";
import Order from "./components/orders/Order";
import Dashboard from "./components/dashboard/Dashboard";
import ProductsPage from "./components/products/ProductsPage";
import NotFound from "./components/not-found/NotFound";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout the user
    store.dispatch(logoutUser());
    // Clear current Store TODO

    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Navbar />
          {/* <Switch> */}
          <Route exact path="/" component={Landing} />
          <Route exact path="/products" component={ProductsPage} />
          <Route exact path="/stores" component={Stores} />
          <Route exact path="/cart" component={Cart} />
          <Switch>
            <PrivateRoute exact path="/orders/:id" component={Order} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/profile" component={Settings} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/mystore" component={StoreFull} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
          <Switch>
            <PrivateRoute
              exact
              path="/create-product"
              component={CreateProduct}
            />
          </Switch>
          <Route exact path="/stores/:handle" component={StoreFull} />
          <Route exact path="/products/:id" component={ProductFull} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </div>
          <Route exact path="/not-found" component={NotFound} />
          {/* TODO MAYBE LATER: */}
          {/* <Route exact path="*" component={NotFound} /> */}
          {/* </Switch> */}
          <Footer />
        </Router>
      </Provider>
    );
  }
}

export default App;
