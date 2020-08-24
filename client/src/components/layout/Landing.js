import React, { Component } from "react";
import Products from "../products/Products";
import Stores from "../stores/Stores";

class Landing extends Component {
  render() {
    return (
      <div>
        <div className="landing m-lg-5 m-md-3">
          {/* <img src="./img/showcase.jpg" alt=""></img> */}
          <div className="landing-centered">
            <h1 className="font-weight-bold text-light">
              Find you Sticker, Son
            </h1>
          </div>
        </div>
        <h2 className="container pl-2 mt-4">Explore Products</h2>
        <Products type="horizontal" />
        <hr />
        <Stores type="horizontal" />
        {/* <hr />
        <Link to="/register" className="btn btn-lg btn-info mr-2">
          Sign Up
        </Link>
        <Link to="/login" className="btn btn-lg btn-light">
          Login
        </Link>
        <hr /> */}
        {/* <h3 className="mt-4"></h3> */}
        <div className="pt-2"></div>
      </div>
    );
  }
}

export default Landing;
